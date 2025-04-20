
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CreditCard, Calendar, Download, CheckCircle, PlusCircle } from 'lucide-react';
import { BillingCycle } from '@/services/types';

interface BillingTabsProps {
  billingCycles: BillingCycle[];
  formatDate: (date: string | Date) => string;
  handleDownloadInvoice: (invoiceId: string) => void;
  navigateToVps: () => void;
}

const BillingTabs: React.FC<BillingTabsProps> = ({
  billingCycles,
  formatDate,
  handleDownloadInvoice,
  navigateToVps
}) => {
  // Transform billing cycles to the invoices format expected by the UI
  const invoices = billingCycles.map(cycle => ({
    id: cycle.id,
    date: cycle.due_date,
    amount: cycle.amount,
    status: cycle.status === 'paid' ? 'paid' : 'pending'
  }));

  // Create transaction data based on billing cycles
  const transactions = billingCycles
    .filter(cycle => cycle.status === 'paid')
    .map(cycle => ({
      id: `TRX-${cycle.id.substring(0, 4)}`,
      date: cycle.paid_date || cycle.due_date,
      method: 'Visa •••• 4242', // This would come from payment method in a real app
      amount: cycle.amount,
      status: 'successful'
    }));

  return (
    <Tabs defaultValue="invoices" className="w-full">
      <TabsList className="grid w-full grid-cols-2 mb-8">
        <TabsTrigger value="invoices" className="flex items-center gap-2">
          <CreditCard className="h-4 w-4" />
          Invoices
        </TabsTrigger>
        <TabsTrigger value="history" className="flex items-center gap-2">
          <Calendar className="h-4 w-4" />
          Payment History
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="invoices">
        <Card>
          <CardHeader>
            <CardTitle>Invoices</CardTitle>
            <CardDescription>
              All your billing statements and invoices
            </CardDescription>
          </CardHeader>
          <CardContent>
            {invoices.length > 0 ? (
              <div className="space-y-4">
                <div className="border rounded-lg overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-secondary/50">
                      <tr>
                        <th className="px-4 py-3 text-left font-medium">Invoice</th>
                        <th className="px-4 py-3 text-left font-medium">Date</th>
                        <th className="px-4 py-3 text-left font-medium">Amount</th>
                        <th className="px-4 py-3 text-left font-medium">Status</th>
                        <th className="px-4 py-3 text-right font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {invoices.map(invoice => (
                        <tr key={invoice.id} className="border-t">
                          <td className="px-4 py-3 text-sm">{invoice.id}</td>
                          <td className="px-4 py-3 text-sm">{formatDate(invoice.date)}</td>
                          <td className="px-4 py-3 text-sm">${typeof invoice.amount === 'number' ? invoice.amount.toFixed(2) : invoice.amount}</td>
                          <td className="px-4 py-3">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              {invoice.status === 'paid' ? 'Paid' : 'Pending'}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-right">
                            <Button variant="ghost" size="sm" onClick={() => handleDownloadInvoice(invoice.id)}>
                              <Download className="h-4 w-4" />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No invoices found.</p>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={navigateToVps}
                >
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Add Your First Service
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="history">
        <Card>
          <CardHeader>
            <CardTitle>Payment History</CardTitle>
            <CardDescription>
              Complete history of all transactions
            </CardDescription>
          </CardHeader>
          <CardContent>
            {transactions.length > 0 ? (
              <div className="space-y-4">
                <div className="border rounded-lg overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-secondary/50">
                      <tr>
                        <th className="px-4 py-3 text-left font-medium">Transaction ID</th>
                        <th className="px-4 py-3 text-left font-medium">Date</th>
                        <th className="px-4 py-3 text-left font-medium">Payment Method</th>
                        <th className="px-4 py-3 text-left font-medium">Amount</th>
                        <th className="px-4 py-3 text-left font-medium">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {transactions.map(transaction => (
                        <tr key={transaction.id} className="border-t">
                          <td className="px-4 py-3 text-sm">{transaction.id}</td>
                          <td className="px-4 py-3 text-sm">{formatDate(transaction.date)}</td>
                          <td className="px-4 py-3 text-sm">{transaction.method}</td>
                          <td className="px-4 py-3 text-sm">${typeof transaction.amount === 'number' ? transaction.amount.toFixed(2) : transaction.amount}</td>
                          <td className="px-4 py-3">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              {transaction.status === 'successful' ? 'Successful' : 'Failed'}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No payment history found.</p>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={navigateToVps}
                >
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Purchase Your First Service
                </Button>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button variant="outline" onClick={navigateToVps}>
              Add New VPS
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default BillingTabs;
