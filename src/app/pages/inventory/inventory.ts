import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { ChangeDetectorRef } from '@angular/core';

import { InventoryService } from '../../services/inventory.service';

interface InventoryItem {

  _id: string;

  itemId: string;

  name: string;

  category: string;

  description: string;

  quantity: number;

  unit: string;

  unitPrice: number;

  supplier: string;

  updatedBy: {

    _id: string;

    fullName: string;

    employeeId: string;

    role: string;

  };

  createdAt: string;

  updatedAt: string;

}

@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule
  ],
  templateUrl: './inventory.html',
  styleUrl: './inventory.scss'
})
export class Inventory implements OnInit {

  constructor(
    private inventoryService: InventoryService,
    private cdr: ChangeDetectorRef
  ) {}

  // ===========================
  // Inventory Data
  // ===========================

  inventoryList: InventoryItem[] = [];

  filteredInventory: InventoryItem[] = [];

  // ===========================
  // Search & Filters
  // ===========================

  searchText = '';

  selectedCategory = '';

  categories: string[] = [];

  // ===========================
  // Loading
  // ===========================

  loading = false;

  // ===========================
  // Modal Controls
  // ===========================

  showForm = false;

  showViewModal = false;

  showDeleteModal = false;

  isEditMode = false;

  validationError = '';

  // ===========================
  // Selected Items
  // ===========================

  selectedItem: InventoryItem | null = null;

  itemToDelete: InventoryItem | null = null;

  // ===========================
  // Inventory Form
  // ===========================

  newItem: any = {

    name: '',

    category: '',

    description: '',

    quantity: 0,

    unit: '',

    unitPrice: 0,

    supplier: ''

  };

  // ===========================
  // Initialize Component
  // ===========================

  ngOnInit(): void {

    console.log('Inventory component initialized');

    this.loadInventory();

    

  }

  // ===========================
  // Load Inventory
  // ===========================

  loadInventory(): void {

    this.loading = true;

    this.inventoryService.getInventory().subscribe({

      next: (response) => {

        this.inventoryList = response.data || [];

this.extractCategories();

this.applyFilters();

this.loading = false;

this.cdr.detectChanges();

      },

      error: (err) => {

        console.error(err);

        this.loading = false;

      }

    });

  }

  // ===========================
  // Extract Categories
  // ===========================

  extractCategories(): void {

    this.categories = [

      ...new Set(

        this.inventoryList.map(item => item.category)

      )

    ].sort();

  }

  // ===========================
  // Search & Filter
  // ===========================

  applyFilters(): void {

  const search = this.searchText.trim().toLowerCase();

  this.filteredInventory = this.inventoryList.filter(item => {

    const matchesSearch =
      !search ||
      item.itemId.toLowerCase().includes(search) ||
      item.name.toLowerCase().includes(search) ||
      item.category.toLowerCase().includes(search) ||
      item.supplier.toLowerCase().includes(search);

    const matchesCategory =
      !this.selectedCategory ||
      item.category === this.selectedCategory;

    return matchesSearch && matchesCategory;

  });

}

  onSearch(): void {
  this.applyFilters();
}

onCategoryChange(): void {
  this.applyFilters();
}


  // ===========================
  // Status Helper
  // ===========================

  getStatus(quantity: number): string {

    if (quantity === 0) {

      return 'Out of Stock';

    }

    if (quantity <= 20) {

      return 'Low Stock';

    }

    return 'In Stock';

  }

    // ===========================
  // Open Add Inventory Form
  // ===========================

  openInventoryForm(): void {

    this.isEditMode = false;

    this.validationError = '';

    this.newItem = {

      name: '',

      category: '',

      description: '',

      quantity: 0,

      unit: '',

      unitPrice: 0,

      supplier: ''

    };

    this.showForm = true;

  }

  // ===========================
  // Edit Inventory
  // ===========================

  editInventory(item: InventoryItem): void {

    this.isEditMode = true;

    this.validationError = '';

    this.newItem = {

      ...item

    };

    this.showForm = true;

  }

  // ===========================
  // Save Inventory
  // ===========================

  saveItem(): void {

    this.validationError = '';

    if (!this.newItem.name?.trim()) {

      this.validationError = 'Item name is required.';

      return;

    }

    if (!this.newItem.category?.trim()) {

      this.validationError = 'Category is required.';

      return;

    }

    if (!this.newItem.unit?.trim()) {

      this.validationError = 'Unit is required.';

      return;

    }

    if (this.newItem.quantity < 0) {

      this.validationError = 'Quantity cannot be negative.';

      return;

    }

    if (this.newItem.unitPrice <= 0) {

      this.validationError = 'Unit price must be greater than zero.';

      return;

    }

    if (this.isEditMode) {

      this.updateInventory();

    } else {

      this.createInventory();

    }

  }

  // ===========================
  // Create Inventory
  // ===========================

  createInventory(): void {

    const payload = {

      name: this.newItem.name,

      category: this.newItem.category,

      description: this.newItem.description,

      quantity: this.newItem.quantity,

      unit: this.newItem.unit,

      unitPrice: this.newItem.unitPrice,

      supplier: this.newItem.supplier

    };

    this.inventoryService.createInventory(payload).subscribe({

      next: () => {

        this.loadInventory();

        this.closeForm();

      },

      error: (err) => {

        console.error(err);

      }

    });

  }

  // ===========================
  // Update Inventory
  // ===========================

  updateInventory(): void {

    const payload = {

      name: this.newItem.name,

      category: this.newItem.category,

      description: this.newItem.description,

      quantity: this.newItem.quantity,

      unit: this.newItem.unit,

      unitPrice: this.newItem.unitPrice,

      supplier: this.newItem.supplier

    };

    this.inventoryService
      .updateInventory(
        this.newItem._id,
        payload
      )
      .subscribe({

        next: () => {

          this.loadInventory();

          this.closeForm();

        },

        error: (err) => {

          console.error(err);

        }

      });

  }

  // ===========================
  // View Inventory
  // ===========================

  viewInventory(item: InventoryItem): void {

    this.inventoryService
      .getInventoryById(item._id)
      .subscribe({

        next: (response) => {

          this.selectedItem = response.data;

          this.showViewModal = true;

        },

        error: (err) => {

          console.error(err);

        }

      });

  }

  closeViewModal(): void {

    this.selectedItem = null;

    this.showViewModal = false;

  }

  // ===========================
  // Delete Inventory
  // ===========================

  deleteInventory(item: InventoryItem): void {

    this.itemToDelete = item;

    this.showDeleteModal = true;

  }

  confirmDelete(): void {

    if (!this.itemToDelete) {

      return;

    }

    this.inventoryService
      .deleteInventory(this.itemToDelete._id)
      .subscribe({

        next: () => {

          this.loadInventory();

          this.cancelDelete();

        },

        error: (err) => {

          console.error(err);

        }

      });

  }

  cancelDelete(): void {

    this.itemToDelete = null;

    this.showDeleteModal = false;

  }

    // ===========================
  // Close Form
  // ===========================

  closeForm(): void {

    this.showForm = false;

    this.isEditMode = false;

    this.validationError = '';

    this.newItem = {

      name: '',

      category: '',

      description: '',

      quantity: 0,

      unit: '',

      unitPrice: 0,

      supplier: ''

    };

  }

  // ===========================
  // Refresh Inventory
  // ===========================

  refreshInventory(): void {

  this.searchText = '';
  this.selectedCategory = '';

  this.applyFilters();

}

  // ===========================
  // Format Currency
  // ===========================

  formatCurrency(amount: number): string {

    return new Intl.NumberFormat('en-IN', {

      style: 'currency',

      currency: 'INR',

      maximumFractionDigits: 2

    }).format(amount);

  }

  // ===========================
  // Format Date
  // ===========================

  formatDate(date: string): string {

    if (!date) {

      return '-';

    }

    return new Date(date).toLocaleString('en-IN', {

      day: '2-digit',

      month: 'short',

      year: 'numeric',

      hour: '2-digit',

      minute: '2-digit'

    });

  }

  // ===========================
  // Updated By Helper
  // ===========================

  getUpdatedBy(item: InventoryItem): string {

    if (!item.updatedBy) {

      return '-';

    }

    return item.updatedBy.fullName;

  }

  // ===========================
  // Track By
  // ===========================

  trackByInventory(
    index: number,
    item: InventoryItem
  ): string {

    return item._id;

  }

  // ===========================
  // Status Badge Class
  // ===========================

  getStatusClass(quantity: number): string {

    if (quantity === 0) {

      return 'out-stock';

    }

    if (quantity <= 20) {

      return 'low-stock';

    }

    return 'in-stock';

  }

  // ===========================
  // Total Items
  // ===========================

  get totalItems(): number {

    return this.inventoryList.length;

  }

  // ===========================
  // Total Quantity
  // ===========================

  get totalQuantity(): number {

    return this.inventoryList.reduce(

      (sum, item) => sum + item.quantity,

      0

    );

  }

  // ===========================
  // Low Stock Count
  // ===========================

  get lowStockCount(): number {

    return this.inventoryList.filter(

      item => item.quantity > 0 && item.quantity <= 20

    ).length;

  }

  // ===========================
  // Out Of Stock Count
  // ===========================

  get outOfStockCount(): number {

    return this.inventoryList.filter(

      item => item.quantity === 0

    ).length;

  }

}