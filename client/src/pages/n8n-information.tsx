import { useLocation } from "wouter";

const privacy = [
  ["Scope and operator", "This policy covers n8nProject, the Google integration used with Engrain AI's privately operated n8n automation instance at n8n.engrainai.com. It is operated by Logan Brock for authorized personal and business workflows. This public information website does not provide access to the automation instance."],
  ["Google data accessed and used", "Depending on the Google permissions you approve and the workflows enabled by the operator, the integration can read and send Gmail messages, read and update Google Sheets, and access Google Drive files. Message content, recipients, attachments, spreadsheet contents, file contents, and associated metadata are processed only as needed for configured workflows. The Google consent screen identifies the permissions requested; not every workflow uses every permission."],
  ["Storage and retention", "Google authorization tokens are stored by n8n so scheduled workflows can run without repeated sign-in. Workflow execution records and outputs may contain Google data and remain in the operator's n8n storage, configured destination services, or backups until removed under those systems' retention settings. There is no single automatic deletion period for every workflow. Contact the operator for deletion of stored workflow records and outputs."],
  ["Sharing and service providers", "Configured workflows may send data to destination services selected by the operator, such as email recipients, spreadsheets, storage, or other connected services. Hosting and other service providers may process data to operate those workflows. Google user data must not be sold, used for targeted advertising, or used to train generalized AI or machine-learning models. Any transfer must be necessary for the authorized workflow, security, legal compliance, or another use permitted by Google's policies."],
  ["Google Limited Use", "n8nProject's use and transfer of information received from Google APIs will adhere to the Google API Services User Data Policy, including the Limited Use requirements. Google data is used for the user-facing automation functions described here, rather than unrelated advertising or profiling."],
  ["Access, security, and your choices", "Access to the n8n instance is restricted to authorized users. Protect your Google account and do not share credentials. You can revoke the app's access in your Google Account's third-party connections settings at any time. Revocation stops future authorized API access but does not itself erase existing workflow records, backups, or data already delivered to a destination service. Contact the operator to request access, correction, or deletion of stored data. No system can guarantee absolute security."],
  ["Contact and changes", "For questions about this integration or deletion requests, contact logan@engrainai.com. Changes to this policy will be posted on this page with an updated effective date."],
];
const terms = [
  ["Authorized use", "n8nProject is a privately operated automation integration, not a public signup service. Only the operator and people expressly authorized by the operator may use it. Connect only Google accounts and data you are permitted to access, and approve only permissions appropriate to your workflows."],
  ["Workflow responsibility", "The operator controls enabled workflows, connected services, recipients, schedules, and data retention. Review workflows before enabling them, especially actions that send email, update spreadsheets, or change files. You remain responsible for the accuracy and authorization of instructions and actions performed through your accounts."],
  ["Availability and third-party services", "The integration depends on n8n, Google APIs, hosting, and other configured services. Availability is not guaranteed. Google may revoke authorization or require renewed consent. Third-party services remain subject to their own terms and policies. This integration is not endorsed by Google."],
  ["Stopping use and data handling", "You may stop using the integration and revoke Google access at any time. The operator may disable workflows or access when needed to maintain the service. Revocation and stored-data deletion are separate; see the Privacy Policy for details and contact the operator for deletion requests."],
  ["Contact", "Questions about access, workflows, or these terms can be sent to logan@engrainai.com. These terms describe this private integration and do not replace separate written service agreements."],
];

export default function N8nInformation() {
  const [location] = useLocation();
  const isPrivacy = location === "/n8n/privacy";
  const isTerms = location === "/n8n/terms";
  const title = isPrivacy ? "Privacy Policy" : isTerms ? "Terms of Service" : "n8nProject";
  const sections = isPrivacy ? privacy : isTerms ? terms : [
    ["Private workflow automation", "n8nProject connects authorized Google accounts to Engrain AI's n8n instance to automate email, spreadsheet, and file tasks. Depending on permissions and enabled workflows, it can process Gmail messages, read and update Google Sheets, and work with Google Drive files."],
    ["You control the connection", "Google asks for consent before the account is connected. The operator configures the workflows and their destinations. Access can be revoked from your Google Account at any time. The integration is intended for the operator's authorized personal and business use; it is not open for public registration."],
    ["Support", "For questions about n8nProject, its Google connection, or stored workflow data, contact logan@engrainai.com."],
  ];
  return <div className="min-h-screen bg-background text-foreground">
    <header className="border-b"><div className="max-w-4xl mx-auto px-6 py-8">
      <a className="text-primary hover:underline" href="/">Engrain AI</a>
      <h1 className="text-4xl font-bold mt-5">{title}</h1>
      <p className="text-muted-foreground mt-3">Google integration for private n8n workflows</p>
      <nav aria-label="n8n information" className="flex flex-wrap gap-6 mt-6 text-primary">
        <a href="/n8n" className="hover:underline">About n8nProject</a>
        <a href="/n8n/privacy" className="hover:underline">Privacy Policy</a>
        <a href="/n8n/terms" className="hover:underline">Terms of Service</a>
      </nav>
    </div></header>
    <main className="max-w-4xl mx-auto px-6 py-10 space-y-8">
      {(isPrivacy || isTerms) && <p className="text-sm text-muted-foreground">Effective date: October 26, 2026</p>}
      {sections.map(([heading, body]) => <section key={heading} className="space-y-3">
        <h2 className="text-2xl font-semibold">{heading}</h2><p className="leading-7 text-muted-foreground">{body}</p>
      </section>)}
      {isPrivacy && <p><a className="text-primary underline" href="https://developers.google.com/terms/api-services-user-data-policy">Google API Services User Data Policy</a>{" · "}<a className="text-primary underline" href="https://myaccount.google.com/connections">Manage Google connections</a></p>}
      <p><a className="text-primary underline" href="mailto:logan@engrainai.com">Contact the operator</a></p>
    </main>
  </div>;
}
