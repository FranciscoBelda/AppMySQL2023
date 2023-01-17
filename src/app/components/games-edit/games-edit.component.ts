import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Game} from "../../common/game";
import {GamesService} from "../../services/games.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormValidators} from "../../validators/form-validators";

@Component({
  selector: 'app-games-edit',
  templateUrl: './games-edit.component.html',
  styleUrls: ['./games-edit.component.css']
})
export class GamesEditComponent implements OnInit{

  gameForm: FormGroup = this.formbuilder.group({
    id: [''],
    title: ['', [Validators.minLength(2),
      Validators.maxLength(255),
      Validators.required,
    FormValidators.notOnlyWhitespace]],
    subtitle: ['', [Validators.minLength(2),
      Validators.maxLength(255),
      Validators.required,
    FormValidators.notOnlyWhitespace]],
    description: ['', [Validators.minLength(2),
      Validators.maxLength(255),
      Validators.required,
    FormValidators.notOnlyWhitespace]],
    image: ['', [Validators.minLength(2),
      Validators.maxLength(255),
      Validators.required,
    FormValidators.notOnlyWhitespace]],
    favorite: [false],
    created_at: ['']
  });
  game: Game = {
    title: '',
    subtitle: '',
    description: '',
    image: '',
    favorite: false
  }
  toast = {
    header: '',
    body: '',
    duration: 2000
  }
  toastShow = false;
  edit =false;
  date: Date = new Date();
  constructor(private formbuilder: FormBuilder,
              private gameService: GamesService,
              private router: Router,
              private activatedRoute: ActivatedRoute){}

  ngOnInit() {
    this.loadGame();
  }
  get title(): any{
    return this.gameForm.get('title');
  }
  get subtitle(): any{
    return this.gameForm.get('subtitle');
  }
  get description(): any{
    return this.gameForm.get('description');
  }
  get image(): any{
    return this.gameForm.get('image');
  }
  get favorite(): any{
    return this.gameForm.get('favorite');
  }
  get created_at(): any{
    return this.gameForm.get('created_at');
  }

  addGame() {
    if (this.gameForm.invalid){
        this.gameForm.markAllAsTouched();
        return;
    }
    this.game = this.gameForm.value;
    delete this.game.created_at;
      this.gameService.addGame(this.game).subscribe(
        (data: any) => {
          this.toastGenerator(data);
        this.router.navigateByUrl('/games');
        })
  }

  editGame() {
    if(this.gameForm.invalid) {
      this.gameForm.markAllAsTouched();
      return;
    }
      this.gameService.updateGame(this.gameForm.value).subscribe(
        (data: any) => {
        this.toastGenerator(data);
          this.router.navigateByUrl('/games');
        }
      )
  }

  private toastGenerator(data: any) {
      this.toast.body = data.message;
      this.toastShow = true;
      setTimeout(() => {
        this.toastShow = false
      }, 2000);
  }

  private loadGame() {
    if (this.activatedRoute.snapshot.params['id']){
      this.edit = true;
      this.gameService.getOneGame(this.activatedRoute.snapshot?.params['id']).subscribe(
        (data: Game) => {
          this.gameForm.setValue(data);
        }
      )
    }
  }
}
