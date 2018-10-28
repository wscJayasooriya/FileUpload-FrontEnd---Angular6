import {Component, ElementRef, ViewChild} from '@angular/core';
import {ProductService} from './services/product.service';
import {FileService} from './services/file.service';
import {Product} from './dtos/product';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'SPRING MVC - ANGULAR 6 FILE UPLOAD EXAMPLE';

  constructor(private productService: ProductService, private fileService: FileService) {}

  products: Array<Product> = [];
  tempProduct: Product = null;
  selectedProduct: Product = new Product();
  manuallySelected: boolean ;
  @ViewChild('fileInput') inputE1: ElementRef;
  size: string;

  clear(): void {
    const index = this.products.indexOf(this.selectedProduct);
    if (index !== -1) {
      this.products[index] = this.tempProduct;
      this.tempProduct = null;
    }
    this.selectedProduct = new Product();
    this.manuallySelected = false;
  }

  upload() {
    console.log('upload');
    const  inputE1: HTMLInputElement = this.inputE1.nativeElement;
    const fileCount: number = inputE1.files.length;
    const formData = new FormData();
    if (fileCount > 0 ) { // a file was selected
        const product: Product = new Product();
        formData.append('file', inputE1.files.item(0), inputE1.files.item(0).name);
        this.size = (inputE1.files.item(0).size / 1024 / 1024).toFixed(2);
        this.fileService.uploadFile(formData);

        this.selectedProduct.imgURL = inputE1.files.item(0).name; // database imgURL column ekta imag name ek set krana thana
        console.log(this.selectedProduct);
        this.productService.saveProduct(this.selectedProduct).subscribe(
          (result) => {
            if (result) {
              alert('Product Saved! Product have sussecccfully Saved...');
              this.clear();
            } else {
              alert('OOPs ! Something wents wrong.. Plz Check again');
            }
          }
        );
    }
  }
}
