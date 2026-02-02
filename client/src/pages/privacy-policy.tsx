import { ArrowLeft, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="border-b bg-muted/40">
        <div className="max-w-5xl mx-auto px-6 py-10 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-sm uppercase tracking-widest text-muted-foreground">Engrain AI</p>
              <h1 className="text-3xl md:text-4xl font-bold">Privacy Policy</h1>
              <p className="text-sm text-muted-foreground mt-1">Effective Date: January 2, 2026</p>
            </div>
          </div>
          <Button asChild variant="ghost">
            <a href="/" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </a>
          </Button>
        </div>
      </div>

      <main className="max-w-5xl mx-auto px-6 py-12">
        <Card className="p-6 md:p-10 space-y-10">
          <div className="space-y-4">
            <p className="text-muted-foreground">
              This Privacy Policy describes how Engrain AI (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;)
              collects, uses, discloses, and protects information when you visit or use engrainai.com (the
              &ldquo;Site&rdquo;) and any related services, content, or communications (collectively, the &ldquo;Services&rdquo;).
            </p>
            <p className="text-muted-foreground">
              By using the Services, you agree to the practices described in this Privacy Policy.
            </p>
          </div>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">1) Information We Collect</h2>
            <div className="space-y-3 text-muted-foreground">
              <p className="font-medium text-foreground">A. Information you provide to us</p>
              <ul className="list-disc list-inside space-y-2">
                <li>Contact details (e.g., name, email address, phone number) when you fill out forms, request support, subscribe, or communicate with us.</li>
                <li>Account information (if you create an account), such as login credentials and profile details.</li>
                <li>Payment information (if you purchase): we may collect billing details and transaction metadata. Payment card details are typically processed by our payment processors and not stored by us, depending on how payments are set up.</li>
                <li>Content you submit (e.g., messages, uploads, comments, responses to surveys).</li>
              </ul>
            </div>
            <div className="space-y-3 text-muted-foreground">
              <p className="font-medium text-foreground">B. Information collected automatically</p>
              <ul className="list-disc list-inside space-y-2">
                <li>Device and usage data: IP address, browser type, device identifiers, pages viewed, referring/exit pages, time spent, links clicked, and other activity.</li>
                <li>Log data: diagnostic, error, and performance data.</li>
                <li>Approximate location derived from IP address.</li>
              </ul>
            </div>
            <div className="space-y-3 text-muted-foreground">
              <p className="font-medium text-foreground">C. Cookies and similar technologies</p>
              <p>We use cookies, pixels, and similar technologies to operate the Site, remember preferences, understand usage, and improve performance. See &ldquo;Cookies&rdquo; below.</p>
            </div>
            <div className="space-y-3 text-muted-foreground">
              <p className="font-medium text-foreground">D. Information from third parties</p>
              <p>We may receive information from service providers (e.g., analytics, payment processors), advertising partners, social media platforms (if you interact with our social pages), and other third parties where permitted by law.</p>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold">2) How We Use Information</h2>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Provide, operate, maintain, and improve the Services</li>
              <li>Respond to inquiries and provide customer support</li>
              <li>Process transactions and send related notices</li>
              <li>Send administrative messages (security, updates, policy changes)</li>
              <li>Send marketing communications (you can opt out anytime)</li>
              <li>Personalize content and user experience</li>
              <li>Monitor, protect, and secure the Services (fraud prevention, abuse detection)</li>
              <li>Comply with legal obligations and enforce our terms</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold">3) Cookies and Analytics</h2>
            <div className="space-y-2 text-muted-foreground">
              <p className="font-medium text-foreground">Cookies.</p>
              <p>Cookies are small files stored on your device. We may use:</p>
              <ul className="list-disc list-inside space-y-2">
                <li>Strictly necessary cookies for site functionality</li>
                <li>Preference cookies to remember settings</li>
                <li>Analytics cookies to understand site usage</li>
                <li>Advertising cookies (if enabled) to measure campaigns and show relevant ads</li>
              </ul>
              <p>You can control cookies through your browser settings. Blocking cookies may affect site functionality.</p>
            </div>
            <div className="space-y-2 text-muted-foreground">
              <p className="font-medium text-foreground">Analytics.</p>
              <p>We may use analytics tools (such as Google Analytics or similar) to help understand how visitors use the Site. These providers may use cookies and collect usage data subject to their own policies.</p>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold">4) How We Share Information</h2>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>With service providers who perform services on our behalf (hosting, payment processing, analytics, customer support, email delivery, security). They are authorized to use information only as needed to provide services to us.</li>
              <li>For legal reasons if required to comply with law, regulation, legal process, or government request, or to protect rights, safety, and security.</li>
              <li>In a business transfer (e.g., merger, acquisition, financing, reorganization, or sale of assets). Information may be transferred as part of that transaction.</li>
              <li>With your consent or at your direction.</li>
            </ul>
            <p className="text-muted-foreground">
              We do not sell your personal information in the ordinary sense. However, some privacy laws define &ldquo;sale&rdquo; or &ldquo;sharing&rdquo; broadly (including certain advertising/analytics activities). See &ldquo;Your Privacy Rights&rdquo; below.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold">5) Third-Party Links and Services</h2>
            <p className="text-muted-foreground">
              The Site may contain links to third-party websites or services. We are not responsible for the privacy practices of those third parties. Your use of third-party services is subject to their policies.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold">6) Data Retention</h2>
            <p className="text-muted-foreground">
              We retain personal information for as long as reasonably necessary to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Provide the Services</li>
              <li>Meet legal, accounting, or reporting requirements</li>
              <li>Resolve disputes and enforce agreements</li>
            </ul>
            <p className="text-muted-foreground">Retention periods vary depending on the type of information and the purpose for which it is used.</p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold">7) Security</h2>
            <p className="text-muted-foreground">
              We use reasonable administrative, technical, and physical safeguards designed to protect information. However, no method of transmission or storage is 100% secure, and we cannot guarantee absolute security.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold">8) Your Choices</h2>
            <div className="space-y-2 text-muted-foreground">
              <p className="font-medium text-foreground">Email marketing.</p>
              <p>You can opt out of marketing emails by using the &ldquo;unsubscribe&rdquo; link or contacting us. You may still receive non-marketing communications (e.g., transactional or security messages).</p>
            </div>
            <div className="space-y-2 text-muted-foreground">
              <p className="font-medium text-foreground">Cookies.</p>
              <p>Manage cookies through browser settings and (where available) cookie preference tools on the Site.</p>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold">9) Your Privacy Rights (U.S. States and International)</h2>
            <p className="text-muted-foreground">
              Depending on where you live, you may have rights regarding your personal information, which may include:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>The right to access the personal information we hold about you</li>
              <li>The right to correct inaccurate information</li>
              <li>The right to delete personal information (subject to exceptions)</li>
              <li>The right to portability (receive a copy in a usable format)</li>
              <li>The right to opt out of certain processing, including certain targeted advertising</li>
              <li>The right to non-discrimination for exercising privacy rights</li>
            </ul>
            <div className="space-y-2 text-muted-foreground">
              <p className="font-medium text-foreground">California (CCPA/CPRA).</p>
              <p>California residents may have additional rights, including the right to opt out of the &ldquo;sale&rdquo; or &ldquo;sharing&rdquo; of personal information (as those terms are defined by California law). If our Site uses advertising/analytics that may be considered &ldquo;sharing,&rdquo; we will honor applicable opt-out signals where required by law.</p>
            </div>
            <div className="space-y-2 text-muted-foreground">
              <p className="font-medium text-foreground">EEA/UK (GDPR).</p>
              <p>If you are in the EEA or UK, processing may be based on one or more legal bases, such as:</p>
              <ul className="list-disc list-inside space-y-2">
                <li>Performance of a contract (to provide the Services)</li>
                <li>Legitimate interests (to operate and improve the Services)</li>
                <li>Consent (for certain marketing/cookies where required)</li>
                <li>Legal obligations</li>
              </ul>
              <p>You may also have the right to lodge a complaint with your local data protection authority.</p>
            </div>
            <p className="text-muted-foreground">
              To exercise rights: Contact us using the information in the &ldquo;Contact Us&rdquo; section. We may need to verify your identity before fulfilling certain requests.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold">10) International Data Transfers</h2>
            <p className="text-muted-foreground">
              If you access the Services from outside the country where our servers or providers are located, your information may be transferred and processed in other countries. We take steps intended to ensure appropriate safeguards where required by law.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold">11) Children&apos;s Privacy</h2>
            <p className="text-muted-foreground">
              The Services are not directed to children under 13 (or under 16 in certain jurisdictions), and we do not knowingly collect personal information from children. If you believe a child has provided personal information, contact us and we will take steps to delete it.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold">12) Do Not Track</h2>
            <p className="text-muted-foreground">
              Some browsers offer a &ldquo;Do Not Track&rdquo; (&ldquo;DNT&rdquo;) signal. Because there is no consistent industry standard for DNT, we may not respond to DNT signals unless required by law.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold">13) Changes to This Privacy Policy</h2>
            <p className="text-muted-foreground">
              We may update this Privacy Policy from time to time. The &ldquo;Effective Date&rdquo; above indicates when it was last revised. Your continued use of the Services after changes means you accept the updated policy.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold">14) Contact Us</h2>
            <p className="text-muted-foreground">
              If you have questions or requests regarding this Privacy Policy, contact:
            </p>
            <div className="space-y-1 text-muted-foreground">
              <p className="font-medium text-foreground">Engrain AI</p>
              <p>Email: <a href="mailto:parker@engrainai.com" className="text-primary hover:underline">parker@engrainai.com</a></p>
            </div>
          </section>
        </Card>
      </main>
    </div>
  );
}
