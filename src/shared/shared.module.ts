import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatMenuModule } from '@angular/material/menu';
import { SpinnerComponent } from './spinner/spinner.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, MatIconModule,MatMenuModule,SpinnerComponent,MatDatepickerModule,
    ToastrModule
  ],
  exports:[CommonModule,MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, MatIconModule,MatMenuModule,SpinnerComponent,MatDatepickerModule,ToastrModule]
})
export class SharedModule { }
