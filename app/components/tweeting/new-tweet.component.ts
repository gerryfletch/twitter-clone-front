import { Component, OnInit } from '@angular/core';
import {GetTagService} from '../../_services/tweeting/get-tag.service';

@Component({
  selector: 'new-tweet',
  templateUrl: './new-tweet.component.html',
  styleUrls: ['./new-tweet.component.scss'],
  providers: [GetTagService]
})
export class NewTweetComponent implements OnInit {

  caretPos = 0;

  constructor(private getTagService: GetTagService) { }

  ngOnInit() {
  }

  onKey(textarea) {
    this.getCaretPos(textarea);
    const text = textarea.value;
    const word = this.getWord(text);

    if (word.startsWith('@') && word.length >= 2) {
      const tag = word.substring(1);
      this.getTags(tag);

    } else if (word.startsWith('#') && word.length >= 2) {
      const hashtag = word.substring(1);
      console.log(hashtag);
    }

  }

  private getTags(tag: string) {
    this.getTagService.getTag(tag)
      .subscribe(
        result => {
          console.log(result);
        },
        error => {
          console.log(error);
        }
      );
  }

  getCaretPos(oField) {
    if (oField.selectionStart || oField.selectionStart === '0') {
      this.caretPos = oField.selectionStart;
    }
  }

  getWord(text) {
    const caretPos = this.findEndOfWordPos(text);
    const preText = text.substring(0, caretPos);
    if (preText.indexOf(' ') > 0) {
      const words = preText.split(' ');
      return words[words.length - 1];
    } else {
      return preText;
    }
  }

  private findEndOfWordPos(text: any) {
    const dur = text.length - this.caretPos;

    if (dur === 0) {
      return this.caretPos;
    } else {
      for (let i = this.caretPos; i < text.length; i++) {
        const c = text.charAt(i);
        if (c === ' ') {
          return i;
        }
      }
    }

  }

}
