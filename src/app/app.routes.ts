import { Routes } from '@angular/router';
import { PlayerInfoComponent} from './player/player-info/player-info.component';
import { PlayerListComponent } from './player/player-list/player-list.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { resolveEditPlayerTitle, resolvePlayerInfoTitle } from './player/player.service';
import { PlayerFormComponent } from './player/player-form/player-form.component';
import { EditPhotoComponent } from './player/edit-photo/edit-photo.component';

export const routes: Routes = [
    {
        path: '',
        component: PlayerListComponent,
        title: 'Tennis Players'
    },
    {
        path: 'players',
        component: PlayerListComponent,
        title: 'Tennis Players'
    },
    {
        path: 'players/add',
        component: PlayerFormComponent,
        title: 'Add a player'      
    },
    {
        path: 'players/:id/edit',
        component: PlayerFormComponent,
        title: resolveEditPlayerTitle
    },
    {
        path: 'players/:id/edit/photo',
        component: EditPhotoComponent,
        title: resolveEditPlayerTitle
    },
    {
        path: 'players/:id',
        component: PlayerInfoComponent,
        title: resolvePlayerInfoTitle
    },
    {
        path: '**',
        component: NotFoundComponent,
        title: 'Page Not Found'
    }
];
