import {Component, Input, OnInit} from '@angular/core';
import {GetTagService} from '../../_services/tweeting/get-tag.service';
import {TweetService} from '../../_services/tweeting/tweet.service';
import {User} from '../../_model/user-model';

@Component({
  selector: 'new-tweet',
  templateUrl: './new-tweet.component.html',
  styleUrls: ['./new-tweet.component.scss'],
  providers: [GetTagService, TweetService]
})
export class NewTweetComponent implements OnInit {

  caretPos = 0;
  cachedTag = '';
  currentWord = '';

  users: User[] = [];


  isValid = false;
  isError = false;

  @Input() tag;

  constructor(private getTagService: GetTagService,
              private postService: TweetService) {
  }

  ngOnInit() {
    if (this.tag !== null) {
      this.tag = '@' + this.tag;
    }
  }

  onKey(textarea) {
    this.getCaretPos(textarea);
    const text = textarea.value;
    this.currentWord = this.getWord(text);

    this.isValid = (text.length > 0 && text.length < 140);
    this.isError = (text.length > 140);

    if (this.currentWord.startsWith('@') && this.currentWord.length >= 3) {
      const tag = this.currentWord.substring(1);

      if (tag === this.cachedTag) {
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
    const index = this.findFirstOccurenceReversed(text, '@');

    textarea.value = text.substr(0, index + 1) + handle + text.substr(index + this.currentWord.length);
    this.users = [];
  }

  // todo: don't refresh! make an API call to reload the data.
  post(textarea: any) {
    this.postService.newTweet(textarea.value)
      .subscribe(
        result => {
          location.reload();
        },
        error => console.log(error)
      )
  }

  private findFirstOccurenceReversed(text: string, search: string) {
    for (let i = this.caretPos; i >= 0; i--) {
      if (text.charAt(i) === search) {
        return i;
      }
    }
  }

  private getTags(tag: string) {
    this.getTagService.getTags(tag)
      .subscribe(
        result => {
          if (result.users.length !== this.users.length) {
            this.users = result.users;
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
