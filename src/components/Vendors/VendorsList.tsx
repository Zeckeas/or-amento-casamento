import React from 'react';
import { Vendor } from '../../types/vendors';
import { getStatusColor } from '../../utils/statusColors';
import { formatCurrency } from '../../utils/budgetCalculations';

type VendorsListProps = {
  vendors: Vendor[];
};

export function VendorsList({ vendors }: VendorsListProps) {
  if (vendors.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Nenhum fornecedor cadastrado ainda.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 table-auto">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Fornecedor
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Serviço
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Valor
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Contato
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {vendors.map((vendor) => (
            <tr key={vendor.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">{vendor.name}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-500">{vendor.service}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{formatCurrency(vendor.price)}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(vendor.status)}`}
                >
                  {vendor.status.charAt(0).toUpperCase() + vendor.status.slice(1)}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {vendor.contact}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
