type StatusColorMap = {
  [key: string]: string;
};

const STATUS_COLORS: StatusColorMap = {
  paid: 'bg-green-100 text-green-800',
  partial: 'bg-yellow-100 text-yellow-800',
  pending: 'bg-red-100 text-red-800',
};

export function getStatusColor(status: string): string {
  return STATUS_COLORS[status] || STATUS_COLORS.pending;
}