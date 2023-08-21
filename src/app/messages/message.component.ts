import { Component } from '@angular/core';
import { MessageService } from './message.service';
import { Router } from '@angular/router';

@Component({
  selector: 'um-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent {
  get messages(): string[] {
    return this.messageService.messages;
  }

  constructor(private messageService: MessageService,
              private router: Router) { }

  close(): void {
    // Close the popup.
    this.router.navigate([{ outlets: { popup: null } }]);
    this.messageService.isDisplayed = false;
  }
