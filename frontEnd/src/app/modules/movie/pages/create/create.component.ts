
import { ClassificationService } from '../../../../shared/services/classification.service';
import { CategoryService } from '../../../../shared/services/category.service';
import { MovieService } from '../../../../shared/services/movie.service';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';
import { FormSelect } from 'materialize-css';
import { Category } from 'src/app/core/models/category.model';
import { Classification } from 'src/app/core/models/classification.model';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  
  @ViewChild('movieBackground') movieBackgroundElement: ElementRef;
  @ViewChild('movieCategory') movieCategoryElement: ElementRef;
  @ViewChild('movieClassification') movieClassificationElement: ElementRef;

  public movieForm: FormGroup;
  public categories: Array<Category> = new Array<Category>();
  public classifications: Array<Classification> = new Array<Classification>();

  private classificationSelector: FormSelect;
  private categorySelector: FormSelect;

  private subs: Array<Subscription>;

  constructor(
    private router: Router,
    private movieService: MovieService,
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private classificationService: ClassificationService
  ) {
    this.subs = new Array<Subscription>();
  }

  ngOnInit(): void {

    this.movieForm = this.formBuilder.group({
      movieTitle: ['', Validators.required],
      movieYear: [2000, Validators.required],
      movieDescription: ['', Validators.required],
      categoryId: [1, Validators.required],
      movieLocked: [false, Validators.required],
      classificationId: [1, Validators.required],
      moviePicture: [null],
      movieLocation: [null]
    });

    this.categoryService.getCategories().then(categories => {
      this.categories = categories;
    });

    this.classificationService.getClassifications().then(classifications => {
      this.classifications = classifications;
    });
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.classificationSelector = M.FormSelect.init(this.movieClassificationElement.nativeElement, {});
      this.categorySelector = M.FormSelect.init(this.movieCategoryElement.nativeElement, {});
      M.textareaAutoResize(document.querySelector('#movieDescription'));
      M.updateTextFields();
    }, 200);
  }

  ngOnDestroy(): void {
    this.subs.forEach(subscription => {
      subscription.unsubscribe();
    });

    this.classificationSelector.destroy();
    this.categorySelector.destroy();
  }

  onSubmit() {
    this.movieService.postMovie(this.movieForm.value, (movieId) => {
      if (!isNaN(movieId))
        return this.router.navigate([`movie/${movieId}`]);
    });
  }

  createCategory() {
    Swal.fire({
      title: 'Qual o nome da nova categoria?',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      cancelButtonText: 'cancelar',
      confirmButtonText: 'Criar',
    }).then((result) => {
      if (result.isConfirmed) {
        if (!result.value) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'O nome da categoria não pode ser vazio!'
          })
        }
        else {
          this.categoryService.createCategory(result.value).then(result => {
            if (result) {
              this.categories.push(result);
              setTimeout(() => {
                this._updateCategorySelector();
              }, 100);
            }
          })
        }
      }
    });
  }

  createClassification() {
    Swal.fire({
      title: 'Qual o nome da nova classificação?',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      cancelButtonText: 'cancelar',
      confirmButtonText: 'Criar'
    }).then((result) => {
      if (result.isConfirmed) {
        if (!result.value) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'O nome da classificação não pode ser vazio!'
          })
        }
        else {
          this.classificationService.createClassification(result.value).then(result => {
            if (result) {
              this.classifications.push(result);
              setTimeout(() => {
                this._updateClassificationSelector();
              }, 100);
            }
          })
        }
      }
    });
  }

  async getPicture(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (e) => {
        this.movieBackgroundElement.nativeElement.style.backgroundImage = "url('" + e.target.result + "')";
      }
      reader.readAsDataURL(event.target.files[0]);
      this.movieForm.get('moviePicture').setValue(event.target.files[0]);
    }
  }

  async getMovie(event) {
    if (event.target.files && event.target.files[0]) {
      this.movieForm.get('movieLocation').setValue(event.target.files[0]);
    }
  }

  private _updateClassificationSelector() {
    if (this.classificationSelector)
      this.classificationSelector.destroy();
    this.classificationSelector = M.FormSelect.init(this.movieClassificationElement.nativeElement, {});
  }

  private _updateCategorySelector() {
    if (this.categorySelector)
      this.categorySelector.destroy();
    this.categorySelector = M.FormSelect.init(this.movieCategoryElement.nativeElement, {});
  }
}

