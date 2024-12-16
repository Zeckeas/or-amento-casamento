import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { formatCurrency, formatDate } from './formatters';
import { BudgetCategory } from '../types/budget';
import { Supplier } from '../types/supplier';
import { Event } from '../types/events';

export const exportToPDF = (
  type: 'financial' | 'suppliers' | 'timeline' | 'summary',
  data: any
) => {
  const doc = new jsPDF();
  const title = `Wedding Planner - ${type.charAt(0).toUpperCase() + type.slice(1)} Report`;
  
  doc.setFontSize(16);
  doc.text(title, 14, 15);
  doc.setFontSize(10);
  doc.text(`Generated on ${new Date().toLocaleDateString()}`, 14, 25);

  switch (type) {
    case 'financial':
      exportFinancialPDF(doc, data as BudgetCategory[]);
      break;
    case 'suppliers':
      exportSuppliersPDF(doc, data as Supplier[]);
      break;
    case 'timeline':
      exportTimelinePDF(doc, data as Event[]);
      break;
    case 'summary':
      exportSummaryPDF(doc, data);
      break;
  }

  doc.save(`wedding-planner-${type}-report.pdf`);
};

export const exportToExcel = (
  type: 'financial' | 'suppliers' | 'timeline' | 'summary',
  data: any
) => {
  let worksheetData: any[] = [];

  switch (type) {
    case 'financial':
      worksheetData = formatFinancialData(data as BudgetCategory[]);
      break;
    case 'suppliers':
      worksheetData = formatSuppliersData(data as Supplier[]);
      break;
    case 'timeline':
      worksheetData = formatTimelineData(data as Event[]);
      break;
    case 'summary':
      worksheetData = formatSummaryData(data);
      break;
  }

  const worksheet = XLSX.utils.json_to_sheet(worksheetData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, type);
  XLSX.writeFile(workbook, `wedding-planner-${type}-report.xlsx`);
};

// Helper functions for PDF export
const exportFinancialPDF = (doc: jsPDF, categories: BudgetCategory[]) => {
  const tableData = categories.map(cat => [
    cat.name,
    formatCurrency(cat.planned),
    formatCurrency(cat.spent),
    formatCurrency(cat.planned - cat.spent),
    `${((cat.spent / cat.planned) * 100).toFixed(1)}%`
  ]);

  autoTable(doc, {
    head: [['Category', 'Planned', 'Spent', 'Remaining', 'Progress']],
    body: tableData,
    startY: 35
  });
};

const exportSuppliersPDF = (doc: jsPDF, suppliers: Supplier[]) => {
  const tableData = suppliers.map(sup => [
    sup.name,
    sup.category,
    sup.status,
    formatCurrency(sup.price),
    sup.rating
  ]);

  autoTable(doc, {
    head: [['Name', 'Category', 'Status', 'Price', 'Rating']],
    body: tableData,
    startY: 35
  });
};

const exportTimelinePDF = (doc: jsPDF, events: Event[]) => {
  const tableData = events.map(event => [
    event.title,
    formatDate(event.date),
    event.type,
    event.completed ? 'Yes' : 'No'
  ]);

  autoTable(doc, {
    head: [['Event', 'Date', 'Type', 'Completed']],
    body: tableData,
    startY: 35
  });
};

// Helper functions for Excel export
const formatFinancialData = (categories: BudgetCategory[]) => {
  return categories.map(cat => ({
    Category: cat.name,
    'Planned Budget': cat.planned,
    'Spent Amount': cat.spent,
    Remaining: cat.planned - cat.spent,
    'Progress (%)': ((cat.spent / cat.planned) * 100).toFixed(1)
  }));
};

const formatSuppliersData = (suppliers: Supplier[]) => {
  return suppliers.map(sup => ({
    Name: sup.name,
    Category: sup.category,
    Status: sup.status,
    Price: sup.price,
    Rating: sup.rating,
    Email: sup.email,
    Phone: sup.phone
  }));
};

const formatTimelineData = (events: Event[]) => {
  return events.map(event => ({
    Title: event.title,
    Date: event.date,
    Type: event.type,
    Completed: event.completed ? 'Yes' : 'No',
    Description: event.description
  }));
};