import { inject, Injectable } from "@angular/core";
import { PLAYERS } from "../players";
import { EditPlayer, NewPlayer, Player } from "../player.model";
import { ActivatedRouteSnapshot, ResolveFn, Router, RouterStateSnapshot } from "@angular/router";

@Injectable({providedIn: 'root'})
export class PlayerService{
    private players: Player[] = PLAYERS;
    private router = inject(Router);

    get getPlayers() {
        return this.players;
    }

    deletePlayer(playerId: string) {
        this.players = this.players.filter(player => player.id !== playerId);
        this.backToList();
    }

    viewPlayer(playerId: string) {
        this.router.navigate(['players', playerId]);
    }

    getPlayer(playerId: string) {
        return this.players.find(player => player.id === playerId);
    }

    backToList() {
        this.router.navigate(['players']);
    }

    backToPlayer(playerId: string) {
        this.router.navigate(['players', playerId]);
    }

    startAddPlayer() {
        this.router.navigate(['players/add']);
    }

    submitAddPlayer(playerData: NewPlayer) {
        this.players.push({
            id: `p${this.players.length + 1}`,
            name: playerData.name,
            country: playerData.country,
            age: playerData.age,
            slams: playerData.slams,
            active: playerData.active,
            photo: playerData.photo
        })
        this.backToList();
    }

    startEditPlayer(playerId: string) {
        this.router.navigate(['players', playerId, 'edit']);
    }

    submitEditPlayer(playerData: EditPlayer, playerId: string) {
        const playerIndex = this.players.findIndex(player => player.id === playerId);

        if(playerIndex !== -1) {
            this.players[playerIndex] = {
                ...this.players[playerIndex],
                name: playerData.name,
                country: playerData.country,
                age: playerData.age,
                slams: playerData.slams,
                active: playerData.active, 
            }
        }
        this.backToPlayer(playerId);
    }

    startEditPhoto(playerId: string) {
        this.router.navigate(['players', playerId, 'edit', 'photo']);
    }

    submitEditPhoto(playerPhoto: string, playerId: string) {
        const playerIndex = this.players.findIndex(player => player.id === playerId);
       
        if(playerPhoto == '') {
            playerPhoto = 'assets/undefined.jpg';
        }
        this.players[playerIndex].photo = playerPhoto;

        this.backToPlayer(playerId);
    }
}

export const resolvePlayerInfoTitle: ResolveFn<string> = (
    activatedRoute: ActivatedRouteSnapshot,
    routerState: RouterStateSnapshot
  ) => {
    const playerService = inject(PlayerService);
    const playerName =
    playerService.getPlayers.find(
        (u) => u.id === activatedRoute.paramMap.get('id')
      )?.name || '';
    return `${playerName}`;
  };

export const resolveEditPlayerTitle: ResolveFn<string> = (
    activatedRoute: ActivatedRouteSnapshot,
    routerState: RouterStateSnapshot
) => {
    const playerInfoTitle = resolvePlayerInfoTitle(activatedRoute, routerState);
    return `${playerInfoTitle} - Edit`
}