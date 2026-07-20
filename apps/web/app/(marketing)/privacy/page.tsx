import type { Metadata } from "next";
import Link from "next/link";
import { FadeIn } from "@/components/FadeIn";
import { GlassPanel } from "@/components/glass/GlassPanel";
import { TezzeractWordmark } from "@/components/TezzeractWordmark";

export const metadata: Metadata = {
  alternates: { canonical: "/privacy" },
  title: "Privacy Policy",
  description:
    "How Travator collects, uses, stores, and protects your personal data — including your rights under GDPR and CCPA.",
};

const LAST_UPDATED = "20 July 2026";

function Section({
  id,
  title,
  children,
}: {
  id?: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-28">
      <h2 className="text-xl tracking-tightest md:text-2xl">{title}</h2>
      <div className="legal-prose mt-4">{children}</div>
    </section>
  );
}

export default function PrivacyPolicyPage() {
  return (
    <>
      <section className="container-editorial pt-24 pb-10 md:pt-32">
        <FadeIn>
          <p className="eyebrow mb-6">Legal</p>
          <h1 className="max-w-4xl text-4xl leading-[1.05] tracking-tightest md:text-5xl">
            Privacy Policy
          </h1>
          <p className="mt-6 max-w-3xl text-base text-gray-500 md:text-lg">
            This policy explains what personal data Travator collects, why we
            collect it, where it is stored, and the choices you have. It is
            written to meet the transparency requirements of the EU General Data
            Protection Regulation (GDPR) and the California Consumer Privacy Act
            (CCPA), as amended by CPRA.
          </p>
          <p className="mt-3 text-sm text-gray-500">
            Last updated: {LAST_UPDATED}
          </p>
        </FadeIn>
      </section>

      <section className="container-editorial pb-20 md:pb-28">
        <FadeIn delay={60}>
          <GlassPanel className="mx-auto max-w-prose space-y-12">
            <Section title="1. Who we are">
              <p>
                <strong>Travator</strong> is a travel planning product operated
                by{" "}
                <strong>
                  <TezzeractWordmark className="h-[0.77em]" /> (Pvt) Ltd
                </strong>{" "}
                (&ldquo;Travator&rdquo;,
                &ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;).
              </p>
              <p>
                Registered address: Level 9, Orion Towers, No 752 Dr Danister De
                Silva Mawatha, Colombo 00900, Sri Lanka.
              </p>
              <p>
                Privacy contact:{" "}
                <a href="mailto:hello@travator.com">hello@travator.com</a>
              </p>
              <p>
                For the purposes of GDPR,{" "}
                <TezzeractWordmark className="h-[0.77em]" /> (Pvt) Ltd is the{" "}
                <strong>data controller</strong> for personal data processed
                through travator.com and our related services.
              </p>
            </Section>

            <Section title="2. Scope">
              <p>This policy applies when you:</p>
              <ul>
                <li>Browse our marketing website (travator.com)</li>
                <li>Use the AI trip planner at /chat</li>
                <li>Sign in with email and one-time passcode (OTP)</li>
                <li>Submit our contact or booking forms</li>
                <li>Communicate with us by email or phone</li>
              </ul>
              <p>
                It does not cover third-party websites or services we link to
                (for example, Calendly scheduling pages), which have their own
                privacy policies.
              </p>
            </Section>

            <Section title="3. Personal data we collect">
              <p>
                We collect only what we need to operate Travator. Depending on
                how you use the product, this may include:
              </p>

              <h3>Account and identity</h3>
              <ul>
                <li>
                  <strong>Email address</strong> — used to sign you in and
                  associate your trips with your account
                </li>
                <li>
                  <strong>Name</strong> — optional; collected when you provide
                  it (for example, via our contact form)
                </li>
              </ul>

              <h3>Trip planning and conversations</h3>
              <ul>
                <li>
                  <strong>Chat messages and interactions</strong> — the text you
                  send, AI replies, and UI actions (destination picks, date
                  changes, booking steps)
                </li>
                <li>
                  <strong>Trip details</strong> — destinations, travel dates,
                  guest count, itinerary preferences, hotel and driver selections
                </li>
                <li>
                  <strong>Conversation metadata</strong> — titles, planning
                  mode (AI or human agent), and model settings
                </li>
              </ul>

              <h3>Contact and support</h3>
              <ul>
                <li>
                  <strong>Contact form submissions</strong> — name, email,
                  message, and optional preferred call time
                </li>
                <li>
                  <strong>Communications</strong> — records of emails or calls
                  when you reach out to us
                </li>
              </ul>

              <h3>Booking and payment (when enabled)</h3>
              <ul>
                <li>
                  <strong>Booking records</strong> — itinerary holds, quotes,
                  confirmation status, and travel dates
                </li>
                <li>
                  <strong>Payment references</strong> — amount, status, and
                  provider reference from Stripe or PayHere. We do{" "}
                  <strong>not</strong> store full card numbers on our servers;
                  payment card data is handled by the payment provider.
                </li>
                <li>
                  <strong>Imported booking emails</strong> (planned feature) —
                  flight PNR, confirmation numbers, and email content you choose
                  to forward for import
                </li>
              </ul>

              <h3>Technical and security data</h3>
              <ul>
                <li>
                  <strong>Authentication tokens</strong> — a signed JSON Web
                  Token (JWT) issued after OTP verification, valid for up to 30
                  days, containing your user ID and email
                </li>
                <li>
                  <strong>OTP records</strong> — a hashed one-time code and
                  expiry timestamp (we never store plaintext OTPs)
                </li>
                <li>
                  <strong>Server logs</strong> — standard request metadata
                  (timestamps, IP address, user agent) for security and
                  debugging
                </li>
                <li>
                  <strong>Cookie consent preference</strong> — stored locally in
                  your browser when you respond to our cookie banner
                </li>
              </ul>

              <p>
                We do <strong>not</strong> currently run advertising
                analytics, sell personal data, or use cross-site tracking
                pixels.
              </p>
            </Section>

            <Section title="4. How we collect data">
              <ul>
                <li>
                  <strong>Directly from you</strong> — when you type in the
                  planner, submit forms, sign in, or contact us
                </li>
                <li>
                  <strong>Automatically</strong> — when our API processes your
                  requests and writes server logs
                </li>
                <li>
                  <strong>From AI and search providers</strong> — we send your
                  conversation text to large language model (LLM) providers to
                  generate replies; we send search queries to embedding providers
                  to match hotels and knowledge content
                </li>
              </ul>
              <p>
                Anonymous users can start planning without an account. When you
                sign in, we link prior conversations to your account where
                technically feasible.
              </p>
            </Section>

            <Section title="5. Why we use your data and legal bases (GDPR)">
              <table>
                <thead>
                  <tr>
                    <th>Purpose</th>
                    <th>Data used</th>
                    <th>Legal basis</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Provide the trip planner and AI assistant</td>
                    <td>Messages, trip details, interactions</td>
                    <td>Contract / pre-contract steps (Art. 6(1)(b))</td>
                  </tr>
                  <tr>
                    <td>Create and manage your account</td>
                    <td>Email, name, JWT, OTP hash</td>
                    <td>Contract (Art. 6(1)(b))</td>
                  </tr>
                  <tr>
                    <td>Process bookings and payments</td>
                    <td>Booking, payment, itinerary data</td>
                    <td>Contract (Art. 6(1)(b))</td>
                  </tr>
                  <tr>
                    <td>Respond to contact requests</td>
                    <td>Name, email, message</td>
                    <td>Legitimate interests / steps at your request (Art. 6(1)(b)/(f))</td>
                  </tr>
                  <tr>
                    <td>Secure and operate our infrastructure</td>
                    <td>Logs, tokens, OTP records</td>
                    <td>Legitimate interests (Art. 6(1)(f))</td>
                  </tr>
                  <tr>
                    <td>Remember cookie preferences</td>
                    <td>Consent choice in local storage</td>
                    <td>Consent (Art. 6(1)(a))</td>
                  </tr>
                  <tr>
                    <td>Comply with law</td>
                    <td>Relevant records</td>
                    <td>Legal obligation (Art. 6(1)(c))</td>
                  </tr>
                </tbody>
              </table>
              <p>
                Where we rely on legitimate interests, you may object as
                described in Section 10. Where we rely on consent, you may
                withdraw it at any time without affecting the lawfulness of
                processing before withdrawal.
              </p>
            </Section>

            <Section title="6. Where data is stored">
              <p>
                Personal data is stored in a <strong>PostgreSQL</strong> database
                hosted on infrastructure we control or contract with. Database
                tables include, among others:
              </p>
              <ul>
                <li>
                  <code>users</code>, <code>otp_codes</code> — account and
                  authentication
                </li>
                <li>
                  <code>conversations</code>, <code>messages</code>,{" "}
                  <code>interactions</code> — chat and UI actions
                </li>
                <li>
                  <code>trips</code>, <code>itineraries</code>,{" "}
                  <code>holds</code>, <code>quotes</code>, <code>bookings</code>,{" "}
                  <code>payments</code> — planning and booking lifecycle
                </li>
                <li>
                  <code>contact_requests</code> — contact form submissions
                </li>
              </ul>
              <p>
                Your browser may store a <strong>JWT</strong> when you sign in
                (currently passed via the Authorization header by client
                applications) and a <strong>cookie consent preference</strong> in{" "}
                <code>localStorage</code>. We do not set first-party marketing
                cookies today.
              </p>
              <p>
                Conversation content is transmitted to LLM providers for
                processing at inference time. Those providers process data under
                their own terms and do not receive ongoing access to our
                database.
              </p>
            </Section>

            <Section title="7. Third-party processors">
              <p>
                We use carefully selected service providers who process data on
                our behalf. They may only use data as instructed by us:
              </p>
              <table>
                <thead>
                  <tr>
                    <th>Provider</th>
                    <th>Purpose</th>
                    <th>Data shared</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Anthropic</td>
                    <td>AI conversation (Claude)</td>
                    <td>Conversation history and system context per request</td>
                  </tr>
                  <tr>
                    <td>OpenAI</td>
                    <td>AI conversation and embeddings (optional)</td>
                    <td>Conversation text; search queries for embeddings</td>
                  </tr>
                  <tr>
                    <td>Voyage AI</td>
                    <td>Semantic search embeddings (optional)</td>
                    <td>Hotel and knowledge search text</td>
                  </tr>
                  <tr>
                    <td>Stripe / PayHere</td>
                    <td>Payment processing (when enabled)</td>
                    <td>Payment amount, booking reference; card data stays with provider</td>
                  </tr>
                  <tr>
                    <td>Google Fonts</td>
                    <td>Typography delivery</td>
                    <td>IP address and browser metadata (see Google&apos;s policy)</td>
                  </tr>
                  <tr>
                    <td>Calendly</td>
                    <td>Call scheduling embed</td>
                    <td>Information you enter in the Calendly widget</td>
                  </tr>
                  <tr>
                    <td>Unsplash CDN</td>
                    <td>Marketing photography</td>
                    <td>Standard CDN request metadata</td>
                  </tr>
                </tbody>
              </table>
              <p>
                We do <strong>not</strong> sell or share personal data for
                cross-context behavioural advertising. Under CCPA/CPRA, we do not
                &ldquo;sell&rdquo; or &ldquo;share&rdquo; personal information
                as those terms are defined in California law.
              </p>
            </Section>

            <Section id="cookies" title="8. Cookies and similar technologies">
              <p>
                A cookie is a small text file stored on your device. We also use
                similar technologies such as <code>localStorage</code>.
              </p>

              <h3>Essential</h3>
              <table>
                <thead>
                  <tr>
                    <th>Name / key</th>
                    <th>Type</th>
                    <th>Purpose</th>
                    <th>Retention</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <code>travator_cookie_consent</code>
                    </td>
                    <td>localStorage</td>
                    <td>Remembers your cookie banner choice</td>
                    <td>Until you clear site data</td>
                  </tr>
                  <tr>
                    <td>Authorization bearer token</td>
                    <td>Client-managed session</td>
                    <td>Keeps you signed in</td>
                    <td>Up to 30 days</td>
                  </tr>
                </tbody>
              </table>

              <h3>Third-party (may set cookies on their domains)</h3>
              <ul>
                <li>
                  <strong>Calendly</strong> — when you open our booking embed
                </li>
                <li>
                  <strong>Google Fonts</strong> — when fonts are loaded from
                  Google&apos;s servers
                </li>
              </ul>

              <p>
                We do not deploy analytics or advertising cookies at this time.
                If that changes, we will update this section and request consent
                where required before enabling non-essential cookies.
              </p>
              <p>
                You can control cookies through your browser settings and
                respond to our site banner. Rejecting non-essential cookies does
                not block access to Travator.
              </p>
            </Section>

            <Section title="9. Retention">
              <p>We keep personal data only as long as needed:</p>
              <ul>
                <li>
                  <strong>Account data</strong> — while your account is active
                  and for a reasonable period afterward if you delete your
                  account
                </li>
                <li>
                  <strong>Conversations and trips</strong> — while you use the
                  service and to support bookings you make through us
                </li>
                <li>
                  <strong>OTP records</strong> — until expiry or verification;
                  we aim to purge consumed codes periodically
                </li>
                <li>
                  <strong>Contact requests</strong> — typically up to 24 months
                  unless a longer period is needed to handle your inquiry
                </li>
                <li>
                  <strong>Booking and payment records</strong> — as required for
                  accounting, tax, and dispute resolution (often 7 years where
                  applicable)
                </li>
                <li>
                  <strong>Server logs</strong> — rolling retention, generally
                  limited to operational needs
                </li>
              </ul>
              <p>
                You may request deletion sooner, subject to legal exceptions
                (Section 10).
              </p>
            </Section>

            <Section title="10. Your rights">
              <h3>GDPR (EEA, UK, and similar jurisdictions)</h3>
              <p>Subject to conditions in law, you have the right to:</p>
              <ul>
                <li>
                  <strong>Access</strong> — obtain a copy of personal data we
                  hold about you
                </li>
                <li>
                  <strong>Rectification</strong> — correct inaccurate data
                </li>
                <li>
                  <strong>Erasure</strong> — request deletion (&ldquo;right to
                  be forgotten&rdquo;)
                </li>
                <li>
                  <strong>Restriction</strong> — limit how we use your data in
                  certain cases
                </li>
                <li>
                  <strong>Portability</strong> — receive data you provided in a
                  structured, machine-readable format
                </li>
                <li>
                  <strong>Object</strong> — object to processing based on
                  legitimate interests
                </li>
                <li>
                  <strong>Withdraw consent</strong> — where processing is
                  based on consent
                </li>
                <li>
                  <strong>Lodge a complaint</strong> — with your local
                  supervisory authority
                </li>
              </ul>

              <h3>CCPA / CPRA (California residents)</h3>
              <p>You have the right to:</p>
              <ul>
                <li>
                  <strong>Know</strong> what personal information we collect,
                  use, and disclose
                </li>
                <li>
                  <strong>Delete</strong> personal information, subject to
                  exceptions
                </li>
                <li>
                  <strong>Correct</strong> inaccurate personal information
                </li>
                <li>
                  <strong>Opt out</strong> of sale or sharing — not applicable
                  today because we do not sell or share data for cross-context
                  advertising
                </li>
                <li>
                  <strong>Non-discrimination</strong> — we will not deny
                  service for exercising these rights
                </li>
              </ul>

              <p>
                To exercise any right, email{" "}
                <a href="mailto:hello@travator.com">hello@travator.com</a> with
                the subject line &ldquo;Privacy request&rdquo;. We may need to
                verify your identity (for example, by confirming control of your
                account email). We aim to respond within 30 days (GDPR) or 45
                days (CCPA), with extensions where permitted.
              </p>
            </Section>

            <Section title="11. International transfers">
              <p>
                Travator is operated from Sri Lanka. Our infrastructure and
                processors may be located in Sri Lanka, the United States, the
                European Union, or other countries. Where GDPR applies, we use
                appropriate safeguards for transfers (such as Standard
                Contractual Clauses) with processors that receive personal data
                from the EEA or UK.
              </p>
            </Section>

            <Section title="12. Security">
              <p>
                We protect data using measures appropriate to the risk, including
                encrypted transport (HTTPS), hashed OTP storage, access controls
                on production systems, and least-privilege access for staff.
                No method of transmission or storage is completely secure; please
                use a strong, unique email account for sign-in.
              </p>
            </Section>

            <Section title="13. Children">
              <p>
                Travator is not directed at children under 16 (or the age required
                in your jurisdiction). We do not knowingly collect personal data
                from children. If you believe a child has provided us data,
                contact us and we will delete it.
              </p>
            </Section>

            <Section title="14. Changes">
              <p>
                We may update this policy when our product, processors, or legal
                obligations change. We will post the revised version on this page
                and update the &ldquo;Last updated&rdquo; date. Material changes
                may also be communicated by email or in-product notice where
                appropriate.
              </p>
            </Section>

            <Section title="15. Contact">
              <p>
                Questions or requests about this policy or your data:
              </p>
              <p>
                <TezzeractWordmark className="h-[0.77em]" /> (Pvt) Ltd — Travator
                <br />
                Level 9, Orion Towers
                <br />
                No 752 Dr Danister De Silva Mawatha
                <br />
                Colombo 00900, Sri Lanka
                <br />
                <a href="mailto:hello@travator.com">hello@travator.com</a>
              </p>
            </Section>
          </GlassPanel>
        </FadeIn>

        <p className="mx-auto mt-10 max-w-prose text-center text-sm text-gray-500">
          <Link href="/" className="hover:text-ink">
            ← Back to home
          </Link>
        </p>
      </section>
    </>
  );
}
