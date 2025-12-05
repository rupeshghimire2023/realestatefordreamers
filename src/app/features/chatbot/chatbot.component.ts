import { Component, ElementRef, ViewChild, AfterViewChecked, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IconComponent } from '../../shared/components/icon/icon.component';
import { GeminiService } from '../../core/services/gemini.service';
import { ChatMessage } from '../../core/models/models';

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [CommonModule, FormsModule, IconComponent],
  template: `
    <!-- Floating Action Button (Face Icon when closed) -->
    <button (click)="toggleChat()"
            class="fixed bottom-6 right-6 w-16 h-16 rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform z-50 group border-4 border-white overflow-hidden bg-slate-900">
      
      <!-- Show Face when closed -->
      <img *ngIf="!isOpen" src="https://firebasestorage.googleapis.com/v0/b/real-estate-for-dreamers-dc887.firebasestorage.app/o/assets%2Fkritika_profile.JPG?alt=media&token=fbb83206-b27a-4eb2-9262-cd3f3c0af8c7" class="w-full h-full object-cover" alt="Chat with Kritika">
      
      <!-- Show X when open -->
      <div *ngIf="isOpen" class="w-full h-full flex items-center justify-center bg-slate-900 text-white">
        <app-icon name="x" class="w-6 h-6"></app-icon>
      </div>
      
      <!-- Notification Dot -->
      <span *ngIf="!isOpen && hasUnread" class="absolute top-0 right-0 w-4 h-4 bg-amber-500 rounded-full border-2 border-white animate-pulse"></span>
    </button>

    <!-- Chat Window -->
    <div *ngIf="isOpen" 
         class="fixed bottom-24 right-6 w-[calc(100vw-3rem)] md:w-96 h-[550px] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden z-50 border border-slate-100 animate-slideUp origin-bottom-right font-sans">
      
      <!-- Header: Personal Profile -->
      <div class="bg-slate-900 p-4 text-white flex items-center gap-4 shadow-md relative overflow-hidden">
        <!-- Background decoration -->
        <div class="absolute top-0 right-0 w-32 h-32 bg-amber-500 rounded-full blur-3xl opacity-20 -mr-10 -mt-10"></div>
        
        <!-- Avatar -->
        <div class="relative shrink-0">
          <img src="https://firebasestorage.googleapis.com/v0/b/real-estate-for-dreamers-dc887.firebasestorage.app/o/assets%2Fkritika_profile.JPG?alt=media&token=fbb83206-b27a-4eb2-9262-cd3f3c0af8c7" class="w-12 h-12 rounded-full object-cover border-2 border-white/20 shadow-lg">
          <div class="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-slate-900 rounded-full"></div>
        </div>
        
        <!-- Info -->
        <div class="relative">
          <h3 class="font-serif font-bold text-lg leading-none">Kritika Katwal</h3>
          <p class="text-xs text-slate-400 mt-1">Top Producer | Realtor®</p>
          <p class="text-[10px] text-amber-500 font-medium flex items-center gap-1 mt-0.5">
            <span class="w-1 h-1 bg-amber-500 rounded-full animate-pulse"></span> Replies Instantly
          </p>
        </div>
      </div>

      <!-- Messages Area -->
      <div class="flex-1 overflow-y-auto p-4 space-y-6 bg-slate-50 scroll-smooth" #scrollContainer>
        
        <!-- Date Separator -->
        <div class="flex justify-center">
           <span class="text-[10px] uppercase tracking-widest text-slate-400 font-medium">Today</span>
        </div>

        <div *ngFor="let msg of messages" 
             [ngClass]="{'flex justify-end': msg.isUser, 'flex justify-start items-end gap-2': !msg.isUser}">
          
          <!-- Bot Avatar (Only show for bot messages) -->
          <img *ngIf="!msg.isUser" src="https://firebasestorage.googleapis.com/v0/b/real-estate-for-dreamers-dc887.firebasestorage.app/o/assets%2Fkritika_profile.JPG?alt=media&token=fbb83206-b27a-4eb2-9262-cd3f3c0af8c7" class="w-8 h-8 rounded-full object-cover border border-slate-200 mb-1 shadow-sm">

          <!-- Message Bubble -->
          <div [ngClass]="{
              'bg-slate-900 text-white rounded-2xl rounded-tr-none shadow-md': msg.isUser, 
              'bg-white text-slate-700 border border-slate-100 rounded-2xl rounded-tl-none shadow-sm': !msg.isUser
            }"
               class="max-w-[80%] p-3.5 text-sm leading-relaxed relative group">
            
            <!-- Name label for Bot -->
            <p *ngIf="!msg.isUser" class="text-[10px] font-bold text-amber-600 mb-1 uppercase tracking-wide">Kritika</p>
            
            {{ msg.text }}
            
            <!-- Time stamp -->
            <span class="text-[9px] opacity-0 group-hover:opacity-50 absolute bottom-1 right-2 transition-opacity duration-200"
                  [ngClass]="{'text-slate-300': msg.isUser, 'text-slate-400': !msg.isUser}">
              {{ msg.time | date:'shortTime' }}
            </span>
          </div>
        </div>

        <!-- Typing Indicator -->
        <div *ngIf="isTyping" class="flex justify-start items-end gap-2 animate-fadeIn">
           <img src="https://firebasestorage.googleapis.com/v0/b/real-estate-for-dreamers-dc887.firebasestorage.app/o/assets%2Fkritika_profile.JPG?alt=media&token=fbb83206-b27a-4eb2-9262-cd3f3c0af8c7" class="w-6 h-6 rounded-full object-cover grayscale opacity-50 mb-1">
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
                 placeholder="Message Kritika..." 
                 class="flex-1 px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-full focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 text-sm transition-all placeholder:text-slate-400">
          <button type="submit" [disabled]="!newMessage.trim() || isTyping" 
                  class="w-12 h-12 bg-slate-900 text-white rounded-full flex items-center justify-center hover:bg-amber-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-lg transform active:scale-95">
            <app-icon name="send" class="w-5 h-5 ml-0.5"></app-icon>
          </button>
        </form>
        <p class="text-[9px] text-center text-slate-400 mt-3 flex items-center justify-center gap-1">
          <span class="w-1.5 h-1.5 bg-green-400 rounded-full"></span> Powered by AI Assistant
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
export class ChatbotComponent implements AfterViewChecked {
  @ViewChild('scrollContainer') private scrollContainer!: ElementRef;
  private geminiService = inject(GeminiService);

  isOpen = false;
  hasUnread = true; 
  newMessage = '';
  isTyping = false;
  
  messages: ChatMessage[] = [
    { text: "Hi! 👋 I'm Kritika. Whether you're buying or selling in Georgia, I'm here to help. What's on your mind?", isUser: false, time: new Date() }
  ];

  toggleChat() {
    this.isOpen = !this.isOpen;
    if (this.isOpen) {
      this.hasUnread = false;
      this.scrollToBottom();
    }
  }

  async sendMessage() {
    if (!this.newMessage.trim()) return;

    const userText = this.newMessage;
    this.messages.push({ text: userText, isUser: true, time: new Date() });
    this.newMessage = '';
    this.scrollToBottom();
    
    this.isTyping = true;

    try {
      const responseText = await this.geminiService.sendMessage(userText);
      this.messages.push({ text: responseText, isUser: false, time: new Date() });
    } catch (error) {
      this.messages.push({ text: "I'm having a little trouble connecting. Please try again.", isUser: false, time: new Date() });
    } finally {
      this.isTyping = false;
      this.scrollToBottom();
    }
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    if (this.scrollContainer) {
      try {
        this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.scrollHeight;
      } catch(err) { }
    }
  }
}