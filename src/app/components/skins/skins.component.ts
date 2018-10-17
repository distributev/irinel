import { OnInit, Component } from '@angular/core';
import { OptionsService } from '../../providers/options.service';

@Component({
  selector: 'app-skins',
  templateUrl: './skins.component.html'
})
export class SkinsComponent implements OnInit {

  ALL_SKINS = ['skin-blue',
    'skin-blue-light',
    'skin-yellow',
    'skin-yellow-light',
    'skin-green',
    'skin-green-light',
    'skin-purple',
    'skin-purple-light',
    'skin-red',
    'skin-red-light',
    'skin-black',
    'skin-black-light'
  ];

  bodyElement = document.getElementsByTagName('body')[0];

  constructor(private optionsService: OptionsService) { };

  async ngOnInit() {

    await this.optionsService.load();

    let skin = await this.optionsService.get('skin').option_value;

    this.applySkin(skin);

  }

  changeSkin(skin) {

    this.applySkin(skin)

    this.saveSkin(skin);

  }

  applySkin(skin) {

    if (skin) {

      this.ALL_SKINS.forEach(eachSkin => {

        setTimeout(() => {
          this.bodyElement.classList.remove(eachSkin);
        }, 0);


      });

      setTimeout(() => {
        this.bodyElement.classList.add(skin);
      }, 0);

    }

  }

  async saveSkin(newSkin) {

    let option = this.optionsService.get('skin');
    option.option_value = newSkin;
    await this.optionsService.save(option);

  }

}
