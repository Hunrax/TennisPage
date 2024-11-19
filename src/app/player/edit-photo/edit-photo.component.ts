import { Component, inject } from '@angular/core';
import { PlayerService } from '../player.service';
import { ActivatedRoute } from '@angular/router';
import { Player } from '../../player.model';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-photo',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './edit-photo.component.html',
  styleUrl: './edit-photo.component.css'
})
export class EditPhotoComponent {
  private playerService = inject(PlayerService);
  private activatedRoute = inject(ActivatedRoute);
  player?: Player = this.playerService.getPlayer(this.activatedRoute.snapshot.paramMap.get('id')!);

  editPhoto = new FormGroup({
    photo: new FormControl(this.player?.photo)
  })

  
  onCancel() {
    this.playerService.backToPlayer(this.player!.id);
  }

  onSubmit() {
    this.playerService.submitEditPhoto(this.editPhoto.value.photo!, this.player!.id)
  }
}
