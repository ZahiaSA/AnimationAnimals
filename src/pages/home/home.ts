import { Component } from '@angular/core';
import {ToastController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  private animaux = [
    {
      'title': 'Vache',
      'image': 'imgs/animals/cow-icon.png',
      'desc': 'Meugle',
      'file': '/sounds/cow.mp3',
      'playing': false
    },
    {
      'title': 'Dauphin',
      'image': 'imgs/animals/dolphin-icon.png',
      'desc': 'Siffle',
      'file': '/sounds/dolphin.mp3',
      'playing': false
    },
    {
      'title': 'Grenouille',
      'image': 'imgs/animals/frog-icon.png',
      'desc': 'Coasse',
      'file': '/sounds/frog.mp3',
      'playing': false
    },
    {
      'title': 'Oiseau',
      'image': 'imgs/animals/bird-icon.png',
      'desc': 'Chante',
      'file': '/sounds/bird.mp3',
      'playing': false
    },
    {
      'title': 'Cochon',
      'image': 'imgs/animals/pig-icon.png',
      'desc': 'Grogne',
      'file': '/sounds/pig.mp3',
      'playing': false
    },
    {
      'title': 'Chien',
      'image': 'imgs/animals/puppy-icon.png',
      'desc': 'Aboie',
      'file': '/sounds/dog.mp3',
      'playing': false
    },
    {
      'title': 'Chat',
      'image': 'imgs/animals/black-cat-icon.png',
      'desc': 'Miaule',
      'file': '/sounds/cat.mp3',
      'playing': false
    },
    {
      'title': 'Cheval',
      'image': 'imgs/animals/horse-icon.png',
      'desc': 'Hennit',
      'file': '/sounds/horse.wav',
      'playing': false
    },
    {
      'title': 'Ane',
      'image': 'imgs/animals/donkey-icon.png',
      'desc': 'Brait',
      'file': '/sounds/donkey.wav',
      'playing': false
    }
  ];
  // variabe choisir animal
  private choosenAnimal;
  //
  private choosenIndex;
  // variable pour le son qui est nulle
  private media = null;
  // variable showReorder qui fait apparetre ou 
  //disparetre le bouton de suppression animal
  private showReorder = false;

  // creation d'un Toast
  constructor(public toastCtrl: ToastController) {

  }
  onAnimalClick(animal) {
    let toastText;
    let toastClass;
    if (!this.choosenAnimal) {
      toastText = "clique d'abord pour entendre un animal";
      toastClass = "";
    } else if (this.choosenAnimal == animal) {
      toastText = "Tu as gagné";
      toastClass = "goodAnswer";
      this.choosenAnimal.playing = false;
      this.choosenAnimal = null;
      this.media = null;

    } else {
      toastText = "Essaie encore";
      toastClass = "badAnswer";

    }

    this.toastCtrl.create(
      {
        message: toastText,
        duration: 1500,
        position: "middle",
        cssClass: toastClass
      }
    ).present();

  }

  // fonction chercher le son de l'animal
  playSound() {
    if (this.media && (this.media.currentTime < this.media.duration)) {
      this.media.pause();
      if (this.choosenAnimal) {
        this.choosenAnimal.playing = false;
      }
    }
    let index = Math.floor(Math.random() * this.animaux.length);
    this.choosenAnimal = this.animaux[index];
    this.choosenIndex = index;
    this.media = new Audio();
    this.media.src = "assets" + this.choosenAnimal.file;
    this.media.load();
    this.media.play();
    this.choosenAnimal.playing = true;
    var that = this;
    this.media.ontimeupdate = function () {
      if (this.ended && that.choosenAnimal) {
        that.choosenAnimal.playing = false;
      }
    }

  }
  // fonction suppression un animal du tableau
  deleteAnimal(pos){
    this.animaux.splice(pos,1);

  }
}


