import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';

@NgModule({
  declarations: [UsersComponent],
  imports: [CommonModule, UsersRoutingModule, MatCardModule],
})
export class UsersModule {}
