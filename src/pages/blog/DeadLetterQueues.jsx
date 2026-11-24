import { Link } from "react-router-dom";
import LikeButton from "../../components/LikeButton";

export default function DeadLetterQueues() {
  return (
    <article
      className="pt-12 pb-20"
      style={{ background: "var(--bg)", color: "var(--text)", minHeight: "100vh" }}
    >
      <div className="mx-auto max-w-[640px] px-5">
        <BackLink />

        <div className="flex items-center gap-3 mb-8">
          <span
            className="font-mono"
            style={{
              fontSize: "10px",
              textTransform: "uppercase",
              letterSpacing: "0.2em",
              color: "var(--text-muted)",
              fontWeight: 600,
            }}
          >
            Distributed Systems
          </span>
          <span style={{ width: 12, height: 1, background: "var(--border)", display: "block" }} />
          <span className="font-mono" style={{ fontSize: "11px", color: "var(--text-muted)" }}>
            November 2026
          </span>
          <span style={{ width: 12, height: 1, background: "var(--border)", display: "block" }} />
          <span className="font-mono" style={{ fontSize: "11px", color: "var(--text-muted)" }}>
            12–15 min read
          </span>
        </div>

        <h1
          className="mb-4"
          style={{
            fontSize: "26px",
            fontWeight: 500,
            letterSpacing: "-0.02em",
            lineHeight: 1.2,
            color: "var(--text)",
          }}
        >
          Dead-Letter Queues: Designing Safe Message Recovery in Distributed Systems
        </h1>

        <p style={{ fontSize: "14px", lineHeight: 1.6, color: "var(--text-muted)", marginBottom: 40 }}>
          Why failed messages need a controlled path back into the system — without losing or
          duplicating them.
        </p>

        <Prose>
          <p>
            Modern distributed systems are designed to handle enormous amounts of asynchronous
            communication. Services exchange events, process background jobs, and coordinate
            operations through message brokers.
          </p>
          <p>But what happens when a message cannot be processed?</p>
          <p>
            A consumer might encounter a database timeout. An external API might become
            unavailable. A message could contain invalid data, or a service might crash halfway
            through processing an event.
          </p>
          <p>
            In a reliable system, these failures should not result in lost messages, endless
            retries, or uncontrolled processing.
          </p>
          <p>
            This is where <strong>Dead-Letter Queues (DLQs)</strong> become important.
          </p>
          <p>
            Dead-letter queues provide a mechanism for isolating messages that cannot be
            successfully processed, allowing engineers to investigate failures and recover
            messages through controlled operations.
          </p>
          <p>
            However, simply storing failed messages is not enough. A production-grade recovery
            system must understand message delivery guarantees, idempotency, retry strategies,
            concurrency, failure classification, and the possibility of duplicate execution.
          </p>
          <p>
            In this article, we&rsquo;ll explore these concepts and examine how to design a safe
            message recovery architecture using Go.
          </p>

          <Section n="01" title="Understanding Dead-Letter Queues">
            <p>
              A Dead-Letter Queue is a dedicated queue or stream used to hold messages that cannot
              be successfully processed through their normal delivery path.
            </p>
            <p>
              Instead of allowing problematic messages to circulate indefinitely, the messaging
              infrastructure or application routes them to a separate destination.
            </p>
            <p>Consider an e-commerce application with several independent services:</p>
            <ul className="bullets">
              <li>An order service creates orders.</li>
              <li>A payment service processes transactions.</li>
              <li>An inventory service updates product availability.</li>
              <li>A notification service sends confirmation emails.</li>
            </ul>
            <p>
              These services communicate asynchronously through a message broker. Suppose the
              payment service receives an event but cannot connect to its payment provider. The
              consumer retries the operation several times, but every attempt fails.
            </p>
            <p>
              At some point, the system must stop retrying automatically and preserve the message
              for investigation. A dead-letter queue provides that mechanism.
            </p>

            <p className="figure-label">A simplified architecture</p>
            <CodeBlock
              code={`Producer
   │
   ▼
Message Broker
   │
   ▼
Consumer ── Process Message
   │
   ├── Success ──────────► Acknowledge
   │
   └── Failure ──────────► Retry policy
                              │
                              ▼
                       Retry exhausted
                              │
                              ▼
                     Dead-letter queue
                              │
                              ▼
                          Inspection
                              │
                              ▼
                           Recovery`}
            />

            <p>
              The important distinction is that a DLQ is not necessarily a place where messages
              are permanently abandoned. It is a controlled holding area for messages requiring
              additional attention.
            </p>
          </Section>

          <Section n="02" title="Why Messages Fail">
            <p>
              Before designing a recovery mechanism, we need to understand the different types of
              failures. Not every failure should trigger the same response.
            </p>

            <SubHeading>Transient failures</SubHeading>
            <p>
              Transient failures are temporary problems that may disappear without changing the
              message. Examples include:
            </p>
            <ul className="bullets">
              <li>Network timeouts.</li>
              <li>Database connection failures.</li>
              <li>HTTP 503 responses.</li>
              <li>Temporary service unavailability.</li>
              <li>Rate limiting.</li>
            </ul>
            <p>These failures may be resolved through retries.</p>

            <SubHeading>Permanent failures</SubHeading>
            <p>
              Permanent failures are unlikely to disappear simply by retrying. Examples include:
            </p>
            <ul className="bullets">
              <li>Invalid JSON payloads.</li>
              <li>Missing required fields.</li>
              <li>Invalid customer identifiers.</li>
              <li>Schema incompatibility.</li>
              <li>Unsupported event types.</li>
            </ul>
            <p>Repeating these operations without correcting the underlying problem is usually wasteful.</p>

            <SubHeading>Duplicate processing</SubHeading>
            <p>
              A message can be successfully processed even when the consumer never acknowledges
              it. If the consumer crashes after completing the operation but before acknowledging
              the message, the broker may deliver it again. This creates the possibility of
              duplicate business operations.
            </p>

            <SubHeading>Unknown failures</SubHeading>
            <p>
              Sometimes there is insufficient information to determine whether a message is safe
              to retry. In these situations, investigation is preferable to automatic recovery.
            </p>
            <p>
              A reliable recovery system must distinguish between these categories instead of
              treating every failed message as recoverable.
            </p>
          </Section>

          <Section n="03" title="Message Brokers and Dead-Letter Handling">
            <p>
              Different message brokers implement message delivery and failure handling
              differently. Understanding their differences is important when building
              broker-independent infrastructure.
            </p>

            <SubHeading>RabbitMQ</SubHeading>
            <p>
              RabbitMQ supports dead-letter exchanges. A queue can be configured with dead-letter
              exchange settings. Messages can be dead-lettered when they are rejected without
              requeueing, expire, or exceed configured queue-length limits.
            </p>
            <p>
              The dead-letter exchange routes those messages to another queue. RabbitMQ also
              maintains metadata describing dead-letter history.
            </p>
            <p>
              One important consideration is acknowledgement behavior. When a consumer
              acknowledges a delivery, RabbitMQ considers that delivery handled. If the consumer
              crashes before acknowledging it, the message can become available for redelivery.
            </p>

            <SubHeading>Redis Streams</SubHeading>
            <p>Redis Streams provides a different messaging model. Its important concepts include:</p>
            <ul className="bullets">
              <li>Streams.</li>
              <li>Consumer groups.</li>
              <li>Pending Entries Lists.</li>
              <li>Message acknowledgements.</li>
              <li>Message claiming.</li>
            </ul>
            <p>
              When a consumer receives an entry through a consumer group, the entry remains
              pending until acknowledged. If a consumer crashes, another consumer can inspect and
              potentially claim the pending entry. This makes Redis Streams particularly
              interesting for applications implementing their own recovery workflows.
            </p>

            <SubHeading>Apache Kafka</SubHeading>
            <p>
              Kafka uses partitions, offsets, and consumer groups. A common dead-letter
              implementation publishes failed records to a separate topic.
            </p>
            <p>
              Unlike RabbitMQ, Kafka does not normally acknowledge and remove each message
              individually. Its consumption model relies on offset management. Consequently, a
              recovery adapter for Kafka must understand:
            </p>
            <ul className="bullets">
              <li>Partition ordering.</li>
              <li>Offset commits.</li>
              <li>Consumer-group coordination.</li>
              <li>Retry topics.</li>
              <li>Dead-letter topics.</li>
            </ul>
            <p>
              The important architectural lesson is that different brokers have different
              delivery semantics. A common recovery interface must account for those differences
              rather than pretending every broker behaves identically.
            </p>
          </Section>

          <Section n="04" title="At-Least-Once Delivery and Message Safety">
            <p>
              One of the most important concepts in distributed messaging is delivery guarantees.
              There are three commonly discussed delivery models.
            </p>
            <ul className="bullets">
              <li>
                <strong>At-most-once delivery.</strong> A message is delivered zero or one times.
                Duplicates are avoided, but a failure can result in message loss.
              </li>
              <li>
                <strong>At-least-once delivery.</strong> A message is delivered one or more times.
                The system prioritizes successful delivery, but duplicate processing is possible.
              </li>
              <li>
                <strong>Exactly-once processing.</strong> The desired outcome is that a logical
                operation takes effect only once. This is difficult to guarantee across
                independent brokers, databases, and external services.
              </li>
            </ul>
            <p>
              A broker&rsquo;s exactly-once features do not automatically guarantee exactly-once
              business operations. For many recovery systems, at-least-once delivery combined with
              idempotent processing is a practical approach.
            </p>

            <SubHeading>Why publishing before acknowledging matters</SubHeading>
            <p>
              Imagine a message exists in a dead-letter queue and needs to be replayed. Consider
              two execution sequences.
            </p>
            <p className="figure-label">Unsafe ordering</p>
            <CodeBlock
              label="message lost"
              code={`1. Acknowledge original DLQ message
2. Publish replacement message
3. Publishing fails`}
            />
            <p>
              The original message is gone, and the replacement was never delivered. This creates
              message loss.
            </p>
            <p className="figure-label">Safer ordering</p>
            <CodeBlock
              label="at-least-once"
              code={`1. Publish replacement message
2. Confirm publishing succeeded
3. Acknowledge original DLQ message`}
            />
            <p>
              If publishing fails, the original message remains available. However, another
              failure window still exists: publishing may succeed, but acknowledging the original
              message may fail. The message could then be published again during another recovery
              attempt.
            </p>
            <p>
              This is why publish-before-ack provides at-least-once behavior rather than
              exactly-once processing. It deliberately favors possible duplication over silent
              message loss.
            </p>
          </Section>

          <Section n="05" title="Idempotency: Protecting Against Duplicate Operations">
            <p>
              Idempotency is fundamental to reliable distributed systems. An operation is
              idempotent when repeating it produces the same intended result as performing it
              once.
            </p>
            <p>
              For example, setting an account&rsquo;s status to <code>ACTIVE</code> multiple times
              should leave the account active. However, charging a customer&rsquo;s credit card
              $100 repeatedly is not naturally idempotent.
            </p>
            <p>Consider this payment event:</p>
            <CodeBlock
              label="event.json"
              code={`{
  "event_id": "evt_1001",
  "customer_id": "cust_45",
  "amount": 100
}`}
            />
            <p>
              The payment service processes the payment successfully. Before acknowledging the
              message, however, the service crashes. The broker delivers the same message again.
              Without duplicate protection, the customer might be charged twice.
            </p>
            <p>A common solution is an idempotency record:</p>
            <CodeBlock
              label="SQL"
              code={`CREATE TABLE processed_events (
  event_id TEXT PRIMARY KEY,
  processed_at TIMESTAMP NOT NULL
);`}
            />
            <p>
              Before performing the business operation, the application checks whether the event
              has already been processed. The event identifier must be protected by a database
              uniqueness constraint or another atomic mechanism.
            </p>
            <p>
              A simple check followed by an insert can race when multiple consumers process the
              same event concurrently. For financial operations, the idempotency record and
              business state change should ideally be committed within the same database
              transaction.
            </p>
            <p>
              This provides an important safety property: replaying a message should not
              automatically mean repeating its business effect.
            </p>
          </Section>

          <Section n="06" title="Designing a Safe Recovery Pipeline">
            <p>
              A production recovery system should not allow an operator to select hundreds of
              failed messages and immediately replay them. Recovery should be a controlled,
              observable process.
            </p>
            <p>A useful pipeline is:</p>
            <Pipeline />
            <p>Let&rsquo;s examine each stage.</p>

            <SubHeading>Stage 1: Inspection</SubHeading>
            <p>Retrieve messages from the dead-letter queue and collect relevant metadata. Useful fields include:</p>
            <ul className="bullets">
              <li>Message identifier.</li>
              <li>Original destination.</li>
              <li>Payload.</li>
              <li>Headers.</li>
              <li>Failure reason.</li>
              <li>Retry count.</li>
              <li>Timestamp.</li>
              <li>Event identifier.</li>
            </ul>
            <p>The objective is to establish what failed and preserve enough information for investigation.</p>

            <SubHeading>Stage 2: Analysis</SubHeading>
            <p>Group messages that appear to share similar failure patterns. For example:</p>
            <DataTable
              columns={["Failure pattern", "Messages"]}
              rows={[
                ["Database connection timeout", "300"],
                ["Invalid customer identifier", "80"],
                ["Duplicate event", "25"],
                ["Unknown application error", "15"],
              ]}
            />
            <p>
              This helps engineers distinguish between a widespread infrastructure failure and
              isolated application problems.
            </p>
            <p>A useful technique is error-signature normalization. For example:</p>
            <CodeBlock
              code={`Connection timeout to 10.0.0.5:5432
Connection timeout to 10.0.0.8:5432
Connection timeout to 10.0.0.9:5432`}
            />
            <p>These errors may share the same underlying cause. They could be normalized to:</p>
            <CodeBlock code={`Connection timeout to {ip}:{port}`} />
            <p>
              However, error text alone is not enough to establish that two messages have
              identical failure causes. Destination, event type, and other contextual information
              should also be considered.
            </p>

            <SubHeading>Stage 3: Classification</SubHeading>
            <p>Every message should receive a recovery classification.</p>
            <DataTable
              columns={["Classification", "Meaning"]}
              rows={[
                ["REPLAYABLE", "Evidence suggests retrying is reasonable"],
                ["REQUIRES_FIX", "The underlying problem must be corrected first"],
                ["DO_NOT_REPLAY", "Replaying could create harmful duplication"],
                ["INVESTIGATE", "There is insufficient evidence"],
              ]}
            />
            <p>
              This is an important distinction between a basic DLQ viewer and an intelligent
              recovery system. A viewer shows failed messages. A recovery system helps determine
              what can safely happen next.
            </p>

            <SubHeading>Stage 4: Recovery planning</SubHeading>
            <p>Before execution, create an explicit recovery plan. It should describe:</p>
            <ul className="bullets">
              <li>Selected message identifiers.</li>
              <li>Destination queue.</li>
              <li>Recovery action.</li>
              <li>Batch size.</li>
              <li>Rate limit.</li>
              <li>Concurrency limit.</li>
              <li>Excluded messages.</li>
              <li>Safety checks.</li>
            </ul>
            <p>The plan should be inspectable before execution.</p>

            <SubHeading>Stage 5: Validation</SubHeading>
            <p>
              A recovery plan can become outdated. Before executing it, validate the current
              broker state. Questions include:
            </p>
            <ul className="bullets">
              <li>Does the destination queue exist?</li>
              <li>Does the original message still exist?</li>
              <li>Has the message already been replayed?</li>
              <li>Is the payload valid?</li>
              <li>Is the destination healthy?</li>
              <li>Does the plan still match the current environment?</li>
            </ul>

            <SubHeading>Stage 6: Dry-run</SubHeading>
            <p>A dry-run previews what would happen without performing mutations. Example:</p>
            <CodeBlock
              label="dry run"
              code={`Recovery Plan: recovery-001
Messages selected: 100
Replayable: 85
Requires fix: 10
Do not replay: 3
Investigate: 2
Destination: orders
Batch size: 25
Changes made: NONE`}
            />
            <p>
              Dry-runs are especially valuable in production environments because they allow
              operators to inspect the potential impact of a recovery operation.
            </p>

            <SubHeading>Stage 7: Execution</SubHeading>
            <p>
              Once validated and explicitly confirmed, the recovery engine can execute the plan.
              It should use:
            </p>
            <ul className="bullets">
              <li>Bounded batch sizes.</li>
              <li>Rate limiting.</li>
              <li>Concurrency limits.</li>
              <li>Publish retries.</li>
              <li>Circuit breakers.</li>
              <li>Duplicate protection.</li>
            </ul>

            <SubHeading>Stage 8: Audit</SubHeading>
            <p>Every recovery operation should produce an audit record. Useful information includes:</p>
            <ul className="bullets">
              <li>Original message identifier.</li>
              <li>Source queue.</li>
              <li>Destination queue.</li>
              <li>Recovery plan identifier.</li>
              <li>Operation result.</li>
              <li>Timestamp.</li>
              <li>Operator.</li>
              <li>Reason for recovery.</li>
            </ul>
            <p>An audit trail is essential when investigating unexpected outcomes.</p>
          </Section>

          <Section n="07" title="Rate Limiting and Concurrency Control">
            <p>
              One dangerous assumption is that once a service becomes healthy again, all failed
              messages should immediately be replayed.
            </p>
            <p>
              Imagine 50,000 messages accumulated while a payment service was unavailable. The
              service recovers. You replay all 50,000 messages simultaneously. The service may
              become overloaded again. This is known as a recovery storm.
            </p>

            <SubHeading>Rate limiting</SubHeading>
            <p>
              Rate limiting controls how many operations can occur within a given period. For
              example:
            </p>
            <CodeBlock code={`Maximum rate: 10 messages per second`} />
            <p>This protects downstream services from excessive traffic.</p>

            <SubHeading>Concurrency control</SubHeading>
            <p>Concurrency control limits how many operations can execute simultaneously. For example:</p>
            <CodeBlock code={`Maximum concurrent operations: 5`} />
            <p>
              These mechanisms solve different problems. A system can have only five concurrent
              operations while still processing messages at a very high rate if each operation
              completes quickly. Both controls may be necessary.
            </p>

            <SubHeading>Token bucket algorithm</SubHeading>
            <p>The token bucket algorithm is a popular rate-limiting technique. Imagine a bucket that holds tokens.</p>
            <ul className="bullets">
              <li>Tokens are added at a fixed rate.</li>
              <li>The bucket has a maximum capacity.</li>
              <li>Each operation consumes one token.</li>
              <li>When no tokens are available, the operation waits.</li>
            </ul>
            <p>
              This allows controlled bursts while maintaining an average processing rate. In Go,
              the <code>golang.org/x/time/rate</code> package provides a practical implementation.
            </p>
          </Section>

          <Section n="08" title="Circuit Breakers">
            <p>
              A circuit breaker prevents a recovery system from repeatedly sending requests to an
              unhealthy dependency.
            </p>
            <p>
              Imagine a recovery engine replaying messages into a service that is still
              experiencing failures. Instead of continuing indefinitely, the recovery engine
              monitors the failure rate. Example:
            </p>
            <CodeBlock
              label="circuit state"
              code={`Total processed: 100
Successful: 70
Failed: 30
Failure rate: 30%
Threshold: 20%
Circuit breaker: OPEN
Recovery paused.`}
            />
            <p>Circuit breakers generally have three states.</p>
            <ul className="bullets">
              <li><strong>Closed:</strong> Requests are allowed.</li>
              <li><strong>Open:</strong> Requests are blocked because the failure threshold has been exceeded.</li>
              <li><strong>Half-open:</strong> A limited number of test requests are allowed to determine whether the dependency has recovered.</li>
            </ul>
            <p>This prevents an unhealthy service from receiving an endless stream of failed operations.</p>
          </Section>

          <Section n="09" title="Designing Broker-Agnostic Architecture in Go">
            <p>A recovery engine should not be tightly coupled to one messaging broker.</p>
            <p>
              Suppose the application initially supports RabbitMQ. Later, Redis Streams support
              becomes necessary. If the recovery engine directly depends on RabbitMQ SDK types,
              adding Redis Streams will require substantial changes.
            </p>
            <p>A better approach is abstraction. Consider a simplified Go interface:</p>
            <CodeBlock
              label="broker.go"
              code={`type Broker interface {
  Connect(ctx context.Context, cfg ConnectionConfig) error
  Close() error
  ListQueues(ctx context.Context) ([]QueueSummary, error)
  Inspect(ctx context.Context, queue string, id string) (*Message, error)
  Publish(ctx context.Context, destination string, msg *Message) error
  Ack(ctx context.Context, queue string, id string) error
}`}
            />
            <CodeBlock
              code={`Recovery Engine
       │
       ▼
    Broker API
       │
       ├── RabbitMQ Adapter
       ├── Redis Streams Adapter
       └── Kafka Adapter`}
            />
            <p>
              Each messaging broker implements the shared contract. The recovery engine interacts
              with the common interface rather than the underlying broker SDK. This is an example
              of dependency inversion and adapter-based architecture.
            </p>

            <SubHeading>Message normalization</SubHeading>
            <p>
              Different brokers represent messages differently. RabbitMQ and Redis Streams do not
              expose identical message structures. If the recovery engine understands every
              broker&rsquo;s internal representation, complexity increases.
            </p>
            <p>Instead, normalize messages into a shared domain model.</p>
            <CodeBlock
              label="message.go"
              code={`type Message struct {
  ID             string
  Queue          string
  Destination    string
  Payload        []byte
  Headers        map[string]string
  ContentType    string
  Timestamp      time.Time
  RetryCount     int
  FailureReason  string
  EventID        string
  IdempotencyKey string
}`}
            />
            <p>
              The recovery engine can now work with one consistent message representation. One
              important design consideration is that broker-specific metadata should not be
              discarded during normalization. It may be required to preserve ordering, delivery
              semantics, or message identity during recovery.
            </p>
          </Section>

          <Section n="10" title="The Dual-Write Problem">
            <p>One of the most challenging problems in message recovery is the dual-write problem.</p>
            <p>Consider two operations:</p>
            <ul className="bullets">
              <li>Publishing a replacement message.</li>
              <li>Acknowledging the original message.</li>
            </ul>
            <p>
              These are independent operations. There is no automatic guarantee that both will
              succeed together. If the application crashes between them, the system may enter an
              inconsistent state.
            </p>
            <CodeBlock
              code={`Publish replacement: SUCCESS
Acknowledge original: FAILED`}
            />
            <p>
              Now the replacement exists, but the original message may also remain available. A
              subsequent recovery attempt could publish another copy.
            </p>
            <p>
              This is why idempotency and duplicate detection must be part of the recovery
              architecture. More advanced designs may use transactional messaging where
              supported, transactional outbox patterns, durable recovery records, or
              broker-specific atomic operations.
            </p>
            <p>
              The important lesson is that distributed operations should be designed around
              partial failure, not just the successful execution path.
            </p>
          </Section>

          <Section n="11" title="Message Ordering and Backpressure">
            <SubHeading>Message ordering</SubHeading>
            <p>
              Some systems require events to be processed in a specific order. Consider:
            </p>
            <CodeBlock
              code={`1. Account created
2. Account funded
3. Account withdrawal`}
            />
            <p>
              Replaying these messages in the wrong order can produce incorrect application
              state. Recovery systems must understand whether ordering matters for a particular
              event type or partition.
            </p>

            <SubHeading>Backpressure</SubHeading>
            <p>
              Backpressure allows a system to slow incoming work when downstream components cannot
              keep up. Without backpressure, a recovery operation can overwhelm the service it is
              attempting to restore.
            </p>
            <p>
              Bounded queues, rate limiting, concurrency controls, and consumer flow control are
              common ways to manage this problem.
            </p>
          </Section>

          <Section n="12" title="Observability in Recovery Systems">
            <p>
              A system cannot be reliably operated if engineers cannot understand its current
              state. A recovery engine should expose useful metrics, including:
            </p>
            <ul className="bullets">
              <li>Total messages in dead-letter queues.</li>
              <li>Pending message count.</li>
              <li>Message processing latency.</li>
              <li>Retry counts.</li>
              <li>Recovery throughput.</li>
              <li>Failure rate.</li>
              <li>Consumer health.</li>
              <li>Circuit breaker state.</li>
              <li>Recovery operation history.</li>
            </ul>
            <p>
              These metrics help operators identify recurring problems and determine whether
              recovery is progressing safely. Observability should be treated as part of the
              architecture, not something added after implementation.
            </p>
          </Section>

          <Section n="13" title="Testing Recovery Systems">
            <p>
              Recovery logic requires more than ordinary unit tests. A system may work perfectly
              during normal execution but fail when publishing succeeds and acknowledgement
              fails.
            </p>
            <p>A strong testing strategy should cover several levels.</p>

            <SubHeading>Unit testing</SubHeading>
            <p>Test:</p>
            <ul className="bullets">
              <li>Message classification.</li>
              <li>Error normalization.</li>
              <li>Retry policies.</li>
              <li>Recovery planning.</li>
              <li>Rate limiting.</li>
              <li>Circuit breaker behavior.</li>
            </ul>

            <SubHeading>Safety testing</SubHeading>
            <p>Verify that:</p>
            <ul className="bullets">
              <li>No publishing occurs without confirmation.</li>
              <li>Failed publishing never acknowledges the original message.</li>
              <li>Missing destinations prevent recovery.</li>
              <li>Dry-runs perform no mutations.</li>
              <li>Circuit breakers stop execution when required.</li>
            </ul>

            <SubHeading>Broker integration testing</SubHeading>
            <p>Test against actual broker instances. For each adapter:</p>
            <ul className="bullets">
              <li>Publish a message.</li>
              <li>Retrieve it.</li>
              <li>Inspect it.</li>
              <li>Verify metadata.</li>
              <li>Acknowledge it.</li>
              <li>Confirm the expected state.</li>
            </ul>

            <SubHeading>Failure injection</SubHeading>
            <p>Introduce deliberate failures. For example:</p>
            <ul className="bullets">
              <li>Stop the broker during publishing.</li>
              <li>Disconnect the database.</li>
              <li>Crash a consumer after processing but before acknowledgement.</li>
              <li>Make the destination unavailable.</li>
              <li>Trigger duplicate deliveries.</li>
            </ul>
            <p>Failure injection reveals problems that successful-path tests cannot expose.</p>
          </Section>

          <Section n="14" title="A Practical Go Implementation">
            <p>Let&rsquo;s implement a simplified version of safe message replay.</p>
            <p>First, define a broker interface:</p>
            <CodeBlock
              label="broker.go"
              code={`type Broker interface {
  Publish(ctx context.Context, destination string, msg *Message) error
  Ack(ctx context.Context, queue string, id string) error
}`}
            />
            <p>Now consider the recovery operation:</p>
            <CodeBlock
              label="replay.go"
              code={`func Replay(
  ctx context.Context,
  broker Broker,
  queue string,
  destination string,
  msg *Message,
  confirm bool,
) error {
  if !confirm {
    return errors.New("explicit confirmation required")
  }

  if err := broker.Publish(ctx, destination, msg); err != nil {
    return fmt.Errorf("publish failed: %w", err)
  }

  if err := broker.Ack(ctx, queue, msg.ID); err != nil {
    return fmt.Errorf("publish succeeded but ack failed: %w", err)
  }

  return nil
}`}
            />
            <p>This small example demonstrates three important principles:</p>
            <ul className="bullets">
              <li>Explicit confirmation before performing a recovery operation.</li>
              <li>Publishing before acknowledging the original message.</li>
              <li>Distinguishing publishing failures from acknowledgement failures.</li>
            </ul>
            <p>
              This is not a complete production implementation. A real recovery engine also needs
              destination validation, durable recovery state, duplicate protection,
              broker-specific acknowledgement handling, retries, and audit logging.
            </p>
            <p>
              The important part is understanding the failure windows before writing the
              implementation.
            </p>
          </Section>

          <Section n="15" title="Engineering Lessons">
            <p>Designing reliable message recovery systems requires understanding more than message brokers.</p>
            <p>The most important principles are:</p>
            <ul className="bullets">
              <li>Not every failure should be retried.</li>
              <li>Messages should not be discarded before successful replacement delivery.</li>
              <li>At-least-once delivery requires duplicate protection.</li>
              <li>Idempotency should be designed into business operations.</li>
              <li>Recovery operations should require explicit safety controls.</li>
              <li>Rate limiting protects downstream services.</li>
              <li>Circuit breakers prevent repeated operations against unhealthy dependencies.</li>
              <li>Recovery plans should be validated before execution.</li>
              <li>Audit logs are essential for operational accountability.</li>
              <li>Broker abstractions should preserve broker-specific delivery semantics.</li>
              <li>Message ordering must be considered during replay.</li>
              <li>Failure scenarios deserve as much testing as successful execution.</li>
            </ul>
          </Section>

          <Section n="16" title="Conclusion">
            <p>
              Distributed systems are not reliable because failures never happen. They are
              reliable because their architecture anticipates failures and provides mechanisms to
              recover without introducing additional problems.
            </p>
            <p>
              Dead-letter queues provide a way to preserve unsuccessful messages. However, safe
              recovery requires a deeper understanding of delivery guarantees, idempotency,
              message ordering, concurrency, and partial failures.
            </p>
            <p>
              A well-designed recovery engine should not simply replay messages. It should
              understand their failure history, classify their recovery suitability, validate the
              current system state, execute controlled operations, and preserve an auditable
              record of what happened.
            </p>
            <p>
              These principles are especially important when building backend infrastructure where
              a single incorrect replay could affect payments, inventory, customer data, or other
              critical business operations.
            </p>
            <p>
              The goal is not merely to recover failed messages. It is to recover them without
              compromising the correctness of the system.
            </p>

            <p className="figure-label">Engineering focus</p>
            <p
              className="font-mono"
              style={{ fontSize: 11.5, lineHeight: 1.8, color: "var(--text-muted)", marginBottom: 28 }}
            >
              Go · Distributed Systems · RabbitMQ · Redis Streams · Message Delivery Guarantees ·
              Idempotency · Fault Tolerance
            </p>

            <a
              href="https://github.com/HalxDocs/dlq_inspector"
              target="_blank"
              rel="noreferrer"
              className="font-mono"
              style={{
                fontSize: 11.5,
                color: "var(--text)",
                textDecoration: "underline",
                textUnderlineOffset: 3,
                display: "inline-block",
              }}
            >
              Further reading and implementation: DLQ Inspector on GitHub
            </a>
          </Section>

          <p style={{ marginTop: 32, fontWeight: 600, color: "var(--text)" }}>
            — HalxDocs ·{" "}
            <a
              href="https://halxdocs.com"
              style={{ color: "var(--text)", textDecoration: "underline", textUnderlineOffset: 3 }}
            >
              halxdocs.com
            </a>{" "}
            ·{" "}
            <a
              href="https://x.com/HalxDocs"
              target="_blank"
              rel="noreferrer"
              style={{ color: "var(--text)", textDecoration: "underline", textUnderlineOffset: 3 }}
            >
              @HalxDocs
            </a>
          </p>
        </Prose>

        <LikeButton slug="/blog/dead-letter-queues-safe-recovery" />
      </div>
    </article>
  );
}

function BackLink() {
  return (
    <Link
      to="/blog"
      className="font-mono inline-flex items-center gap-2 mb-12 transition-colors"
      style={{
        fontSize: "11px",
        textTransform: "uppercase",
        letterSpacing: "0.18em",
        color: "var(--text-muted)",
        fontWeight: 600,
        textDecoration: "none",
      }}
    >
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M19 12H5M12 19l-7-7 7-7" />
      </svg>
      All writing
    </Link>
  );
}

function Section({ n, title, children }) {
  return (
    <section style={{ marginTop: 36 }}>
      <h2
        style={{
          fontSize: 15,
          fontWeight: 600,
          letterSpacing: "-0.01em",
          lineHeight: 1.35,
          color: "var(--text)",
          margin: "0 0 14px",
          paddingTop: 18,
          borderTop: "1px solid var(--border)",
        }}
      >
        <span className="font-mono" style={{ fontSize: 10.5, color: "var(--text-dim)", marginRight: 10 }}>
          {n}
        </span>
        {title}
      </h2>
      {children}
    </section>
  );
}

function SubHeading({ children }) {
  return (
    <h3
      style={{
        fontSize: 13.5,
        fontWeight: 600,
        letterSpacing: "-0.01em",
        color: "var(--text)",
        margin: "24px 0 8px",
      }}
    >
      {children}
    </h3>
  );
}

function CodeBlock({ code, label }) {
  const lines = code.split("\n");
  return (
    <div className="article-code-wrap">
      {label && <div className="article-code-label">{label}</div>}
      <pre className="article-code">
        <code>
          {lines.map((line, i) => (
            <span key={i}>
              {line}
              {i < lines.length - 1 ? "\n" : ""}
            </span>
          ))}
        </code>
      </pre>
    </div>
  );
}

function DataTable({ columns, rows }) {
  return (
    <div className="article-table">
      <div className="article-table-row article-table-head">
        <span>{columns[0]}</span>
        <span>{columns[1]}</span>
      </div>
      {rows.map((row, i) => (
        <div className="article-table-row" key={i}>
          <span className="article-table-key">{row[0]}</span>
          <span>{row[1]}</span>
        </div>
      ))}
    </div>
  );
}

function Pipeline() {
  const stages = ["Inspect", "Analyze", "Classify", "Plan", "Validate", "Dry-run", "Recover", "Audit"];
  return (
    <div className="pipeline" aria-label="Recovery pipeline">
      {stages.map((stage, i) => (
        <span className="pipeline-item" key={stage}>
          <span>{stage}</span>
          {i < stages.length - 1 && <span className="pipeline-arrow" aria-hidden="true">→</span>}
        </span>
      ))}
    </div>
  );
}

function Prose({ children }) {
  return (
    <div
      style={{ fontSize: "14px", lineHeight: 1.7, color: "var(--text-muted)" }}
      className="prose-content"
    >
      {children}
      <style>{`
        .prose-content > p,
        .prose-content section p { margin-bottom: 1.4em; }
        .prose-content strong { color: var(--text); font-weight: 600; }
        .prose-content code {
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 0.88em;
          color: var(--text);
          background: rgba(127, 127, 127, 0.12);
          padding: 1px 5px;
          border-radius: 4px;
        }
        .prose-content .figure-label {
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 9.5px;
          text-transform: uppercase;
          letter-spacing: 0.14em;
          color: var(--text-dim);
          margin-bottom: 6px;
        }
        .prose-content .bullets {
          margin: 0 0 1.4em;
          padding-left: 20px;
          list-style: disc outside;
        }
        .prose-content .bullets li {
          margin-bottom: 7px;
          padding-left: 3px;
        }
        .prose-content .bullets li::marker { color: var(--text-muted); }

        .prose-content .article-code code {
          background: none;
          padding: 0;
          border-radius: 0;
          font-size: inherit;
          color: inherit;
        }
        .prose-content .article-code-wrap { margin: 0 0 1.5em; }
        .prose-content .article-code-label {
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 9.5px;
          text-transform: uppercase;
          letter-spacing: 0.14em;
          color: var(--text-dim);
          margin-bottom: 6px;
        }
        .prose-content .article-code {
          margin: 0;
          max-width: 100%;
          padding: 13px 15px;
          border: 1px solid var(--border);
          border-radius: 8px;
          background: var(--surface);
          overflow-x: auto;
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 11px;
          line-height: 1.7;
          color: var(--text);
          tab-size: 2;
        }

        .prose-content .article-table {
          margin: 4px 0 1.5em;
          border-top: 1px solid var(--border);
        }
        .prose-content .article-table-row {
          display: grid;
          grid-template-columns: 230px 1fr;
          gap: 16px;
          padding: 9px 0;
          border-bottom: 1px solid var(--border);
          font-size: 13px;
          line-height: 1.55;
        }
        .prose-content .article-table-head {
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 9.5px;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: var(--text-dim);
        }
        .prose-content .article-table-key { color: var(--text); font-weight: 600; }

        .prose-content .pipeline {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 4px;
          margin: 0 0 1.5em;
          padding: 12px 14px;
          border: 1px solid var(--border);
          border-radius: 8px;
          background: var(--surface);
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 11px;
          color: var(--text);
        }
        .prose-content .pipeline-item {
          display: inline-flex;
          align-items: center;
          gap: 4px;
        }
        .prose-content .pipeline-arrow { color: var(--text-dim); margin-right: 4px; }

        @media (max-width: 560px) {
          .prose-content .article-table-row { grid-template-columns: 1fr; gap: 1px; }
          .prose-content .pipeline { font-size: 10px; }
        }
      `}</style>
    </div>
  );
}
