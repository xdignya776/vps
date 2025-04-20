
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Building } from 'lucide-react';

const SalesCard: React.FC = () => (
  <Card>
    <CardHeader>
      <CardTitle>Sales Inquiries</CardTitle>
    </CardHeader>
    <CardContent>
      <p>Interested in our services? Contact our sales team:</p>
      <div className="mt-2">
        <p className="font-medium">Email:</p>
        <p className="text-primary">sales@dgservers.gr</p>
      </div>
      <div className="mt-2">
        <p className="font-medium">Phone:</p>
        <p className="text-primary">+30 6978861518</p>
      </div>
    </CardContent>
  </Card>
);

const SupportCard: React.FC = () => (
  <Card>
    <CardHeader>
      <CardTitle>Technical Support</CardTitle>
    </CardHeader>
    <CardContent>
      <p>Already a customer? Contact our support team:</p>
      <div className="mt-2">
        <p className="font-medium">Email:</p>
        <p className="text-primary">support@dgservers.gr</p>
      </div>
      <div className="mt-2">
        <p className="font-medium">Support Portal:</p>
        <Link to="/support" className="text-primary underline">
          Access Support Portal
        </Link>
      </div>
    </CardContent>
  </Card>
);

const CompanyInfoCard: React.FC = () => (
  <Card>
    <CardHeader>
      <CardTitle>Company Information</CardTitle>
      <CardDescription>Official registration details</CardDescription>
    </CardHeader>
    <CardContent className="space-y-2">
      <div className="flex items-start">
        <Building className="h-5 w-5 mr-2 text-muted-foreground flex-shrink-0 mt-0.5" />
        <div>
          <p className="font-medium">DG Servers ΜΟΝΟΠΡΟΣΩΠΗ ΙΔΙΩΤΙΚΗ ΚΕΦΑΛΑΙΟΥΧΙΚΗ ΕΤΑΙΡΕΙΑ</p>
          <p className="text-sm text-muted-foreground">Αρ. ΓΕΜΗ 183713421000</p>
          <p className="text-sm text-muted-foreground">Α.Φ.Μ. 802839153</p>
        </div>
      </div>
    </CardContent>
  </Card>
);

const ContactInfo: React.FC = () => {
  return (
    <div className="space-y-6">
      <SupportCard />
      <SalesCard />
      <CompanyInfoCard />
    </div>
  );
};

export default ContactInfo;
