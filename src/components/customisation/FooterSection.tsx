import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface FooterSectionProps {
  showPageNumbers: boolean;
  setShowPageNumbers: (value: boolean) => void;
  showEmail: boolean;
  setShowEmail: (value: boolean) => void;
  showName: boolean;
  setShowName: (value: boolean) => void;
}

export default function FooterSection({
  showPageNumbers,
  setShowPageNumbers,
  showEmail,
  setShowEmail,
  showName,
  setShowName,
}: FooterSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Footer</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="page-numbers"
            checked={showPageNumbers}
            onChange={(e) => setShowPageNumbers(e.target.checked)}
            className="h-4 w-4 rounded border-primary accent-primary"
          />
          <label
            htmlFor="page-numbers"
            className="cursor-pointer text-sm text-primary"
          >
            Page numbers
          </label>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="email"
            checked={showEmail}
            onChange={(e) => setShowEmail(e.target.checked)}
            className="h-4 w-4 rounded border-primary accent-primary"
          />
          <label
            htmlFor="email"
            className="cursor-pointer text-sm text-primary"
          >
            Email
          </label>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="name"
            checked={showName}
            onChange={(e) => setShowName(e.target.checked)}
            className="h-4 w-4 rounded border-primary accent-primary"
          />
          <label htmlFor="name" className="cursor-pointer text-sm text-primary">
            Name
          </label>
        </div>
      </CardContent>
    </Card>
  );
}
