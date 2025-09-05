// src/app/components/navbar/navbar.component.ts

import { CommonModule } from '@angular/common';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'navbar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  template: `
    <nav class="relative bg-white dark:bg-cyan-900 shadow-md">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <a class="text-2xl font-bold text-cyan-800 dark:text-white"
            >Maquinas App</a
          >
          <div class="md:hidden">
            @if (!isMenuOpen) {
            <button
              (click)="toggleMenu()"
              type="button"
              class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-cyan-700 focus:outline-none focus:bg-cyan-700 focus:text-white transition duration-150 ease-in-out"
            >
              <svg
                class="h-6 w-6"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </button>
            } @else {
            <button
              (click)="toggleMenu()"
              type="button"
              class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-cyan-700 focus:outline-none focus:bg-cyan-700 focus:text-white transition duration-150 ease-in-out"
            >
              <svg
                class="h-6 w-6"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
            }
          </div>
          <div
            [ngClass]="{ 'max-h-0': !isMenuOpen, 'max-h-screen': isMenuOpen }"
            class="absolute left-0 top-16 w-full overflow-hidden bg-white shadow-md transition-all duration-500 ease-in-out dark:bg-cyan-900 md:relative md:top-auto md:w-auto md:max-h-full md:opacity-100 md:shadow-none"
          >
            <ul
              class="flex flex-col md:flex-row md:space-x-8 mt-4 md:mt-0 px-4 pb-4 md:px-0 md:pb-0"
            >
              <li>
                <a
                  class="block py-2 px-3 text-black dark:text-white rounded hover:bg-gray-500 md:hover:bg-transparent md:border-0 md:hover:text-cyan-700 transition duration-300"
                  [routerLink]="['/maquinas']"
                  routerLinkActive="md:text-cyan-700 font-semibold"
                  [routerLinkActiveOptions]="{ exact: true }"
                  >Home</a
                >
              </li>
              <li>
                <a
                  class="block py-2 px-3 text-black dark:text-white rounded hover:bg-gray-500 md:hover:bg-transparent md:border-0 md:hover:text-cyan-700 transition duration-300"
                  [routerLink]="['/maquinas/create']"
                  routerLinkActive="md:text-cyan-700 font-semibold"
                  >Crear Maquina</a
                >
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {
  isMenuOpen: boolean = false;

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
