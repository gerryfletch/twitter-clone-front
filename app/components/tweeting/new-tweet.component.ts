import { Component, OnInit } from '@angular/core';
import {GetTagService} from '../../_services/tweeting/get-tag.service';
import {User} from '../../_model/user';
import {PostTweetService} from '../../_services/tweeting/post-tweet.service';
import {Tweet} from '../../_model/tweet-model';

@Component({
  selector: 'new-tweet',
  templateUrl: './new-tweet.component.html',
  styleUrls: ['./new-tweet.component.scss'],
  providers: [GetTagService, PostTweetService]
})
export class NewTweetComponent{

  caretPos = 0;
  cachedTag = '';
  currentWord = '';

  users: User[] = [];

  isValid = false;
  isError = false;

  constructor(private getTagService: GetTagService,
              private postService: PostTweetService) { }

  onKey(textarea) {
    this.getCaretPos(textarea);
    const text = textarea.value;
    this.currentWord = this.getWord(text);

    this.isValid = (text.length > 0 && text.length < 140);
    this.isError = (text.length > 140);

    if (this.currentWord.startsWith('@') && this.currentWord.length >= 3) {
      const tag = this.currentWord.substring(1);

      if(tag === this.cachedTag) {
        return;
      } else {
        this.cachedTag = tag;
      }

      /* Update Tag View */
      this.getTags(tag);

    } else if (this.currentWord.startsWith('#') && this.currentWord.length >= 2) {
      const hashtag = this.currentWord.substring(1);
    } else {
      this.users = [];
      this.cachedTag = '';
    }

  }

  tagClicked(handle: string, textarea: any) {
    let text: string = textarea.value;
    const updatedVal = text.replace(this.currentWord, '@' + handle);

    const index = this.findFirstOccurenceReversed(text, '@');

    const update = text.substr(0, index + 1) + handle + text.substr(index + this.currentWord.length);
    console.log(text);
    console.log(update);

    textarea.value = update;
    this.users = [];
  }

  post(textarea: any) {
    this.postService.newTweet(textarea.value)
      .subscribe(
        result => {
          console.log(result);
        },
        error => console.log(error)
      )
  }

  private findFirstOccurenceReversed(text: string, search: string) {
    for(let i = this.caretPos; i >= 0; i--) {
      if (text.charAt(i) === search) {
        return i;
      }
    }
  }

  private getTags(tag: string){
    this.getTagService.getTags(tag)
      .subscribe(
        users => {
          if(users.length !== this.users.length) {
            this.users = users;
          }
        },
        err => console.log(err)
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
