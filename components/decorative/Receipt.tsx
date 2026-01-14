'use client';

import { cn } from '@/lib/utils';

interface ReceiptProps {
  /** Receipt style */
  variant?: 'store' | 'ticket' | 'invoice' | 'ledger';
  /** Width of receipt */
  width?: number;
  /** Paper color */
  color?: string;
  /** Store/business name */
  storeName?: string;
  /** Items to display */
  items?: Array<{ name: string; price: string }>;
  /** Total amount */
  total?: string;
  /** Date string */
  date?: string;
  /** Show faded/aged effect */
  faded?: boolean;
  /** Rotation angle */
  rotation?: number;
  className?: string;
}

/**
 * Vintage receipt/ticket decoration
 */
export function Receipt({
  variant = 'store',
  width = 140,
  color = '#fffef5',
  storeName = 'GENERAL STORE',
  items = [
    { name: 'Dry Goods', price: '0.45' },
    { name: 'Tea', price: '0.25' },
    { name: 'Sugar', price: '0.15' },
  ],
  total = '0.85',
  date = 'Nov 15, 1923',
  faded = true,
  rotation = 0,
  className,
}: ReceiptProps) {
  const height = 80 + items.length * 16 + (variant === 'ticket' ? 40 : 20);

  return (
    <div
      className={cn('relative', className)}
      style={{
        width,
        minHeight: height,
        transform: `rotate(${rotation}deg)`,
        backgroundColor: color,
        filter: faded ? 'sepia(0.1) contrast(0.95) brightness(0.98)' : undefined,
        boxShadow: '1px 2px 6px rgba(0,0,0,0.12)',
      }}
    >
      {/* Torn top edge */}
      <div
        className="absolute top-0 left-0 right-0 h-2"
        style={{
          background: color,
          clipPath: `polygon(
            0% 100%, 5% 40%, 10% 100%, 15% 50%, 20% 100%, 25% 30%, 30% 100%,
            35% 60%, 40% 100%, 45% 40%, 50% 100%, 55% 50%, 60% 100%, 65% 30%,
            70% 100%, 75% 60%, 80% 100%, 85% 40%, 90% 100%, 95% 50%, 100% 100%
          )`,
        }}
      />

      <div className="px-2 pt-3 pb-2">
        {variant === 'store' && (
          <StoreReceipt storeName={storeName} items={items} total={total} date={date} />
        )}
        {variant === 'ticket' && <TicketReceipt />}
        {variant === 'invoice' && <InvoiceReceipt items={items} total={total} date={date} />}
        {variant === 'ledger' && <LedgerReceipt items={items} />}
      </div>

      {/* Torn bottom edge */}
      <div
        className="absolute bottom-0 left-0 right-0 h-3"
        style={{
          background: color,
          clipPath: `polygon(
            0% 0%, 5% 70%, 10% 0%, 15% 60%, 20% 0%, 25% 80%, 30% 0%,
            35% 50%, 40% 0%, 45% 70%, 50% 0%, 55% 60%, 60% 0%, 65% 80%,
            70% 0%, 75% 50%, 80% 0%, 85% 70%, 90% 0%, 95% 60%, 100% 0%,
            100% 100%, 0% 100%
          )`,
        }}
      />

      {/* Faded spots */}
      {faded && (
        <>
          <div
            className="absolute pointer-events-none"
            style={{
              top: '20%',
              left: '10%',
              width: 40,
              height: 30,
              background: 'radial-gradient(ellipse, rgba(255,255,255,0.3) 0%, transparent 70%)',
            }}
          />
          <div
            className="absolute pointer-events-none"
            style={{
              bottom: '30%',
              right: '15%',
              width: 30,
              height: 25,
              background: 'radial-gradient(ellipse, rgba(255,255,255,0.25) 0%, transparent 70%)',
            }}
          />
        </>
      )}

      {/* Paper grain texture */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}

interface StoreReceiptProps {
  storeName: string;
  items: Array<{ name: string; price: string }>;
  total: string;
  date: string;
}

function StoreReceipt({ storeName, items, total, date }: StoreReceiptProps) {
  return (
    <div className="font-mono text-xs" style={{ color: '#3a3226' }}>
      {/* Header */}
      <div className="text-center mb-2">
        <div className="font-bold text-sm tracking-wider">{storeName}</div>
        <div className="text-xs opacity-70">{date}</div>
        <div className="mt-1" style={{ borderBottom: '1px dashed #8b7355', width: '100%' }} />
      </div>

      {/* Items */}
      <div className="space-y-1">
        {items.map((item, i) => (
          <div key={i} className="flex justify-between">
            <span>{item.name}</span>
            <span>${item.price}</span>
          </div>
        ))}
      </div>

      {/* Total */}
      <div className="mt-2 pt-1" style={{ borderTop: '1px dashed #8b7355' }}>
        <div className="flex justify-between font-bold">
          <span>TOTAL</span>
          <span>${total}</span>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center mt-2 text-xs opacity-60">Thank You</div>
    </div>
  );
}

function TicketReceipt() {
  return (
    <div className="font-mono text-center" style={{ color: '#3a3226' }}>
      {/* Header */}
      <div className="text-sm font-bold tracking-widest mb-1">ADMIT ONE</div>
      <div className="text-xs opacity-70 mb-2">GRAND THEATRE</div>

      {/* Decorative line */}
      <div className="flex items-center justify-center gap-1 mb-2">
        <span>★</span>
        <div className="flex-1" style={{ borderBottom: '1px solid #8b7355' }} />
        <span>★</span>
      </div>

      {/* Details */}
      <div className="text-xs space-y-1">
        <div>EVENING SHOW</div>
        <div className="font-bold">8:00 PM</div>
        <div className="opacity-70">SEAT 14-B</div>
      </div>

      {/* Stub line */}
      <div
        className="mt-3 pt-2 relative"
        style={{
          borderTop: '1px dashed #8b7355',
        }}
      >
        <div className="text-xs font-bold">No. 4521</div>
        <div
          className="absolute left-0 top-0 w-3 h-3 bg-white rounded-full"
          style={{ transform: 'translate(-50%, -50%)' }}
        />
        <div
          className="absolute right-0 top-0 w-3 h-3 bg-white rounded-full"
          style={{ transform: 'translate(50%, -50%)' }}
        />
      </div>
    </div>
  );
}

interface InvoiceReceiptProps {
  items: Array<{ name: string; price: string }>;
  total: string;
  date: string;
}

function InvoiceReceipt({ items, total, date }: InvoiceReceiptProps) {
  return (
    <div className="font-serif text-xs" style={{ color: '#3a3226' }}>
      {/* Header */}
      <div className="text-center mb-2">
        <div className="text-sm font-bold italic">INVOICE</div>
        <div className="text-xs opacity-70">{date}</div>
      </div>

      {/* Decorative border */}
      <div
        className="p-2 mb-2"
        style={{
          border: '1px solid #8b7355',
        }}
      >
        {/* Items table */}
        <div className="space-y-1">
          <div className="flex justify-between font-bold border-b border-dashed pb-1">
            <span>Description</span>
            <span>Amount</span>
          </div>
          {items.map((item, i) => (
            <div key={i} className="flex justify-between">
              <span>{item.name}</span>
              <span>${item.price}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Total */}
      <div className="flex justify-between font-bold">
        <span>Amount Due:</span>
        <span>${total}</span>
      </div>

      {/* Signature line */}
      <div className="mt-3 pt-2 text-right">
        <div style={{ borderTop: '1px solid #8b7355', width: '60%', marginLeft: 'auto' }} />
        <div className="text-xs opacity-60 italic">Authorized Signature</div>
      </div>
    </div>
  );
}

interface LedgerReceiptProps {
  items: Array<{ name: string; price: string }>;
}

function LedgerReceipt({ items }: LedgerReceiptProps) {
  return (
    <div className="font-mono text-xs" style={{ color: '#3a3226' }}>
      {/* Ledger lines */}
      <div className="relative">
        {/* Vertical ruling */}
        <div
          className="absolute top-0 bottom-0"
          style={{
            left: '70%',
            width: 1,
            backgroundColor: '#cc9999',
            opacity: 0.5,
          }}
        />
        <div
          className="absolute top-0 bottom-0"
          style={{
            left: '85%',
            width: 1,
            backgroundColor: '#cc9999',
            opacity: 0.5,
          }}
        />

        {/* Entries */}
        <div className="space-y-2">
          {items.map((item, i) => (
            <div
              key={i}
              className="flex items-center"
              style={{
                borderBottom: '1px solid #d4c9b5',
                paddingBottom: 4,
              }}
            >
              <span className="w-4 text-right opacity-50">{i + 1}.</span>
              <span className="flex-1 ml-2">{item.name}</span>
              <span className="w-12 text-right">${item.price}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

interface TicketStubProps {
  /** Event name */
  event?: string;
  /** Number on stub */
  number?: string;
  /** Rotation */
  rotation?: number;
  className?: string;
}

/**
 * Small ticket stub for decoration
 */
export function TicketStub({
  event = 'RAFFLE',
  number = '0742',
  rotation = 0,
  className,
}: TicketStubProps) {
  return (
    <div
      className={cn('relative', className)}
      style={{
        width: 60,
        height: 30,
        backgroundColor: '#ffeb99',
        transform: `rotate(${rotation}deg)`,
        boxShadow: '1px 1px 3px rgba(0,0,0,0.1)',
      }}
    >
      {/* Perforated edge */}
      <div
        className="absolute left-0 top-0 bottom-0 w-1"
        style={{
          background: `repeating-linear-gradient(
            to bottom,
            #ffeb99 0px,
            #ffeb99 3px,
            transparent 3px,
            transparent 6px
          )`,
        }}
      />

      <div className="h-full flex flex-col items-center justify-center font-mono">
        <div className="text-xs font-bold" style={{ color: '#8b4513' }}>
          {event}
        </div>
        <div className="text-sm font-bold" style={{ color: '#333' }}>
          {number}
        </div>
      </div>
    </div>
  );
}
