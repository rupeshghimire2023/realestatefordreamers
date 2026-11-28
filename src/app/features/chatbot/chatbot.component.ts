import { Component, ElementRef, Injector, afterNextRender, effect, inject, signal, viewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IconComponent } from '../../shared/components/icon/icon.component';
import { ChatService } from '../../core/services/chat.service';
import { ChatMessage } from '../../core/models/models';
import { ConfigService } from '../../core/services/config.service';
import { ImgFallbackDirective } from '../../shared/directives/img-fallback.directive';

@Component({
  selector: 'app-chatbot',
  imports: [CommonModule, FormsModule, IconComponent, ImgFallbackDirective],
  template: `
    <!-- Floating Action Button (Face Icon when closed) -->
    <button type="button" (click)="toggleChat()"
            [attr.aria-label]="isOpen() ? 'Close chat' : 'Chat with ' + assistantName"
            [attr.aria-expanded]="isOpen()"
            aria-controls="chat-window"
            class="fixed bottom-6 right-6 w-16 h-16 rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform z-50 group border-4 border-white overflow-hidden bg-slate-900">
      
      <!-- Show Face when closed -->
      <img *ngIf="!isOpen()" [src]="cfg.realtor.avatarUrl" [appFallback]="cfg.branding.logoMark" fallbackFit="contain" class="w-full h-full object-cover" alt="">
      
      <!-- Show X when open -->
      <div *ngIf="isOpen()" class="w-full h-full flex items-center justify-center bg-slate-900 text-white">
        <app-icon name="x" class="w-6 h-6"></app-icon>
      </div>
      
      <!-- Notification Dot -->
      <span *ngIf="!isOpen() && hasUnread()" class="absolute top-0 right-0 w-4 h-4 bg-amber-500 rounded-full border-2 border-white animate-pulse"></span>
    </button>

    <!-- Chat Window -->
    <div *ngIf="isOpen()" id="chat-window" role="dialog" [attr.aria-label]="assistantName"
         class="fixed bottom-24 right-6 w-[calc(100vw-3rem)] md:w-96 h-[550px] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden z-50 border border-slate-100 animate-slideUp origin-bottom-right font-sans">
      
      <!-- Header: Personal Profile -->
      <div class="bg-slate-900 p-4 text-white flex items-center gap-4 shadow-md relative overflow-hidden">
        <!-- Background decoration -->
        <div class="absolute top-0 right-0 w-32 h-32 bg-amber-500 rounded-full blur-3xl opacity-20 -mr-10 -mt-10"></div>
        
        <!-- Avatar -->
        <div class="relative shrink-0">
          <img [src]="cfg.realtor.avatarUrl" [appFallback]="cfg.branding.logoMark" fallbackFit="contain" alt="" class="w-12 h-12 rounded-full object-cover border-2 border-white/20 shadow-lg">
        </div>
        
        <!-- Info -->
        <div class="relative">
          <h3 class="font-serif font-bold text-lg leading-none">{{ cfg.realtor.fullName }}</h3>
          <p class="text-xs text-slate-400 mt-1">Virtual assistant (AI)</p>
          <p class="text-[10px] text-amber-500 font-medium mt-0.5">{{ cfg.realtor.firstName }} follows up personally</p>
        </div>
      </div>

      <!-- Messages Area -->
      <div class="flex-1 overflow-y-auto p-4 space-y-6 bg-slate-50 scroll-smooth" #scrollContainer role="log" aria-live="polite">
        
        <!-- Date Separator -->
        <div class="flex justify-center">
           <span class="text-[10px] uppercase tracking-widest text-slate-400 font-medium">Today</span>
        </div>

        <div *ngFor="let msg of messages()" 
             [ngClass]="{'flex justify-end': msg.isUser, 'flex justify-start items-end gap-2': !msg.isUser}">
          
          <!-- Bot Avatar (Only show for bot messages) -->
          <img *ngIf="!msg.isUser" [src]="cfg.realtor.avatarUrl" [appFallback]="cfg.branding.logoMark" fallbackFit="contain" alt="" class="w-8 h-8 rounded-full object-cover border border-slate-200 mb-1 shadow-sm">

          <!-- Message Bubble -->
          <div [ngClass]="{
              'bg-slate-900 text-white rounded-2xl rounded-tr-none shadow-md': msg.isUser, 
              'bg-white text-slate-700 border border-slate-100 rounded-2xl rounded-tl-none shadow-sm': !msg.isUser
            }"
               class="max-w-[80%] p-3.5 text-sm leading-relaxed relative group whitespace-pre-line">
            
            <!-- Name label for Bot -->
            <p *ngIf="!msg.isUser" class="text-[10px] font-bold text-amber-600 mb-1 uppercase tracking-wide">{{ cfg.realtor.firstName }}'s assistant</p>
            
            {{ msg.text }}
            
            <!-- Time stamp -->
            <span class="text-[9px] opacity-0 group-hover:opacity-50 absolute bottom-1 right-2 transition-opacity duration-200"
                  [ngClass]="{'text-slate-300': msg.isUser, 'text-slate-400': !msg.isUser}">
              {{ msg.time | date:'shortTime' }}
            </span>
          </div>
        </div>

        <!-- Typing Indicator -->
        <div *ngIf="isTyping()" class="flex justify-start items-end gap-2 animate-fadeIn">
           <img [src]="cfg.realtor.avatarUrl" [appFallback]="cfg.branding.logoMark" fallbackFit="contain" alt="" class="w-6 h-6 rounded-full object-cover grayscale opacity-50 mb-1">
           <div class="bg-slate-100 px-4 py-2 rounded-full text-xs flex gap-1 items-center">
             <span class="w-1 h-1 bg-slate-400 rounded-full animate-bounce"></span>
             <span class="w-1 h-1 bg-slate-400 rounded-full animate-bounce delay-100"></span>
             <span class="w-1 h-1 bg-slate-400 rounded-full animate-bounce delay-200"></span>
           </div>
        </div>
      </div>

      <!-- Input Area -->
      <div class="p-4 bg-white border-t border-slate-100">
        <form (ngSubmit)="sendMessage()" class="flex gap-2 items-center">
          <input [(ngModel)]="newMessage" name="message" 
                 autocomplete="off"
                 maxlength="1000"
                 aria-label="Your question"
                 placeholder="Ask a question..." 
                 class="flex-1 px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-full focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 text-sm transition-all placeholder:text-slate-400">
          <button type="submit" [disabled]="!newMessage.trim() || isTyping()" aria-label="Send message" 
                  class="w-12 h-12 bg-slate-900 text-white rounded-full flex items-center justify-center hover:bg-amber-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-lg transform active:scale-95">
            <app-icon name="send" class="w-5 h-5 ml-0.5"></app-icon>
          </button>
        </form>
        <p class="text-[10px] text-center text-slate-400 mt-3 leading-snug">
          AI assistant, not {{ cfg.realtor.firstName }}. Answers can be wrong and aren't legal or financial advice.
        </p>
      </div>
    </div>
  `,
  styles: [`
    @keyframes slide-up {
      from { opacity: 0; transform: translateY(20px) scale(0.95); }
      to { opacity: 1; transform: translateY(0) scale(1); }
    }
    .animate-slideUp {
      animation: slide-up 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }
    .animate-fadeIn {
      animation: fade-in 0.3s ease-out forwards;
    }
    .delay-100 { animation-delay: 0.1s; }
    .delay-200 { animation-delay: 0.2s; }
    @keyframes bounce {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-4px); }
    }
    .animate-bounce {
      animation: bounce 0.6s infinite;
    }
  `]
})
export class ChatbotComponent {
  protected cfg = inject(ConfigService).config();
  protected readonly assistantName = `${this.cfg.realtor.firstName}'s virtual assistant`;

  private scrollContainer = viewChild<ElementRef<HTMLElement>>('scrollContainer');
  private chatService = inject(ChatService);
  private injector = inject(Injector);

  isOpen = signal(false);
  hasUnread = signal(true);
  newMessage = '';
  isTyping = signal(false);

  private readonly storageKey = 'rfd-chat-v2';
  messages = signal<ChatMessage[]>(this.restoreMessages());

  constructor() {
    // Keep the newest message in view when one arrives or the window opens -
    // but not on every change detection, so visitors can scroll back to read.
    effect(() => {
      this.messages();
      this.isTyping();
      if (!this.isOpen()) return;
      afterNextRender(() => this.scrollToBottom(), { injector: this.injector });
    });
  }

  toggleChat() {
    this.isOpen.update(open => !open);
    if (this.isOpen()) this.hasUnread.set(false);
  }

  async sendMessage() {
    if (!this.newMessage.trim() || this.isTyping()) return;

    const userText = this.newMessage;
    const history = this.messages();
    this.addMessage({ text: userText, isUser: true, time: new Date() });
    this.newMessage = '';
    this.isTyping.set(true);

    try {
      const responseText = await this.chatService.sendMessage(userText, history);
      this.addMessage({ text: responseText, isUser: false, time: new Date() });
    } catch (error) {
      this.addMessage({ text: "I'm having a little trouble connecting. Please try again.", isUser: false, time: new Date() });
    } finally {
      this.isTyping.set(false);
    }
  }

  private addMessage(msg: ChatMessage) {
    this.messages.update(list => [...list, msg]);
    try {
      sessionStorage.setItem(this.storageKey, JSON.stringify(this.messages()));
    } catch { /* storage unavailable (private mode) - chat still works */ }
  }

  // Keeps the conversation across page reloads within the same browser tab.
  private restoreMessages(): ChatMessage[] {
    try {
      const saved = JSON.parse(sessionStorage.getItem(this.storageKey) || '[]');
      if (Array.isArray(saved) && saved.length) {
        return saved.map((m: ChatMessage) => ({ ...m, time: new Date(m.time) }));
      }
    } catch { /* ignore corrupt or unavailable storage */ }
    return [
      { text: `Hi! 👋 I'm ${this.cfg.realtor.firstName}'s virtual assistant. Ask me about buying or selling a home in Georgia, or how to get in touch with ${this.cfg.realtor.firstName}.`, isUser: false, time: new Date() }
    ];
  }

  private scrollToBottom(): void {
    const el = this.scrollContainer()?.nativeElement;
    if (el) el.scrollTop = el.scrollHeight;
  }
}
