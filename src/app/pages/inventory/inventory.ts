import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

interface InventoryItem {

  id: string;

  name: string;

  category: string;

  quantity: number;

  price: number;

  supplier: string;

  status: 'In Stock' | 'Low Stock' | 'Out of Stock';

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
export class Inventory {

  // ===========================
  // Search & Filter
  // ===========================

  searchText = '';

  selectedCategory = '';

  // ===========================
  // Modal Controls
  // ===========================

  showForm = false;

  showViewModal = false;

  showDeleteModal = false;

  isEditMode = false;

  validationError = '';

  // ===========================
  // Selected Item
  // ===========================

  selectedItem: InventoryItem | null = null;

  itemToDelete: InventoryItem | null = null;

  // ===========================
  // Inventory Form
  // ===========================

  newItem: InventoryItem = {

    id: '',

    name: '',

    category: 'Safety',

    quantity: 0,

    price: 0,

    supplier: '',

    status: 'In Stock'

  };

  // ===========================
  // Dummy Data
  // ===========================

  inventoryList: InventoryItem[] = [

    {

      id: 'INV-101',

      name: 'Safety Helmet',

      category: 'Safety',

      quantity: 45,

      price: 850,

      supplier: 'ABC Safety',

      status: 'In Stock'

    },

    {

      id: 'INV-102',

      name: 'Safety Gloves',

      category: 'Safety',

      quantity: 12,

      price: 120,

      supplier: 'SafeEquip',

      status: 'Low Stock'

    },

    {

      id: 'INV-103',

      name: 'Drill Machine',

      category: 'Tools',

      quantity: 8,

      price: 4200,

      supplier: 'Bosch',

      status: 'Low Stock'

    },

    {

      id: 'INV-104',

      name: 'Voltage Tester',

      category: 'Electrical',

      quantity: 0,

      price: 650,

      supplier: 'Havells',

      status: 'Out of Stock'

    },

    {

      id: 'INV-105',

      name: 'PVC Cable',

      category: 'Electrical',

      quantity: 55,

      price: 95,

      supplier: 'Polycab',

      status: 'In Stock'

    }

  ];

  // ===========================
  // Filter Inventory
  // ===========================

  get filteredInventory(): InventoryItem[] {

    return this.inventoryList.filter(item => {

      const matchesSearch =

        item.name
          .toLowerCase()
          .includes(this.searchText.toLowerCase())

        ||

        item.id
          .toLowerCase()
          .includes(this.searchText.toLowerCase());

      const matchesCategory =

        this.selectedCategory === '' ||

        item.category === this.selectedCategory;

      return matchesSearch && matchesCategory;

    });

  }

  // ===========================
  // Open Inventory Form
  // ===========================

  openInventoryForm(): void {

    this.isEditMode = false;

    this.validationError = '';

    this.newItem = {

      id: '',

      name: '',

      category: 'Safety',

      quantity: 0,

      price: 0,

      supplier: '',

      status: 'In Stock'

    };

    this.showForm = true;

  }

    // ===========================
  // Save Inventory Item
  // ===========================

  saveItem(): void {

    this.validationError = '';

    if (
      !this.newItem.name.trim() ||
      !this.newItem.category.trim() ||
      !this.newItem.supplier.trim()
    ) {

      this.validationError = 'Please fill all required fields.';
      return;

    }

    if (this.newItem.quantity < 0) {

      this.validationError = 'Quantity cannot be negative.';
      return;

    }

    if (this.newItem.price <= 0) {

      this.validationError = 'Price must be greater than zero.';
      return;

    }

    // Auto Status

    if (this.newItem.quantity === 0) {

      this.newItem.status = 'Out of Stock';

    } else if (this.newItem.quantity <= 20) {

      this.newItem.status = 'Low Stock';

    } else {

      this.newItem.status = 'In Stock';

    }

    if (this.isEditMode) {

      const index = this.inventoryList.findIndex(
        item => item.id === this.newItem.id
      );

      if (index !== -1) {

        this.inventoryList[index] = {
          ...this.newItem
        };

      }

    } else {

      const lastId = this.inventoryList.length
        ? Math.max(
            ...this.inventoryList.map(item =>
              Number(item.id.replace('INV-', ''))
            )
          )
        : 100;

      this.newItem.id = `INV-${lastId + 1}`;

      this.inventoryList.push({
        ...this.newItem
      });

    }

    this.closeForm();

  }

  // ===========================
  // View Inventory
  // ===========================

  viewInventory(item: InventoryItem): void {

    this.selectedItem = {
      ...item
    };

    this.showViewModal = true;

  }

  closeViewModal(): void {

    this.showViewModal = false;

    this.selectedItem = null;

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
  // Delete Inventory
  // ===========================

  deleteInventory(item: InventoryItem): void {

    this.itemToDelete = item;

    this.selectedItem = item;

    this.showDeleteModal = true;

  }

  confirmDelete(): void {

    if (!this.itemToDelete) return;

    this.inventoryList = this.inventoryList.filter(
      item => item.id !== this.itemToDelete!.id
    );

    this.cancelDelete();

  }

  cancelDelete(): void {

    this.showDeleteModal = false;

    this.itemToDelete = null;

    this.selectedItem = null;

  }

    // ===========================
  // Close Inventory Form
  // ===========================

  closeForm(): void {

    this.showForm = false;

    this.validationError = '';

    this.isEditMode = false;

    this.newItem = {

      id: '',

      name: '',

      category: 'Safety',

      quantity: 0,

      price: 0,

      supplier: '',

      status: 'In Stock'

    };

  }

}