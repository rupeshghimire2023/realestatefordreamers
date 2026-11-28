import { TestBed } from '@angular/core/testing';
import { ChatbotComponent } from './chatbot.component';
import { ChatService } from '../../core/services/chat.service';

describe('ChatbotComponent', () => {
  let sendMessage: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    sessionStorage.clear();
    sendMessage = vi.fn().mockResolvedValue('Happy to help!');
    TestBed.configureTestingModule({
      imports: [ChatbotComponent],
      providers: [{ provide: ChatService, useValue: { sendMessage } }]
    });
  });

  it('presents itself as an AI assistant, not the realtor', async () => {
    const fixture = TestBed.createComponent(ChatbotComponent);
    await fixture.whenStable();
    const el: HTMLElement = fixture.nativeElement;

    const toggle = el.querySelector('button')!;
    expect(toggle.getAttribute('aria-label')).toBe("Chat with Kritika's virtual assistant");

    toggle.click();
    await fixture.whenStable();
    expect(el.textContent).toContain('Virtual assistant (AI)');
    expect(el.textContent).toContain("I'm Kritika's virtual assistant");
    expect(el.textContent).toContain('AI assistant, not Kritika');
  });

  it('sends the conversation and shows the reply', async () => {
    const fixture = TestBed.createComponent(ChatbotComponent);
    const chat = fixture.componentInstance;
    chat.toggleChat();
    chat.newMessage = 'Do you help first-time buyers?';
    await chat.sendMessage();
    await fixture.whenStable();

    expect(sendMessage).toHaveBeenCalledWith('Do you help first-time buyers?', expect.any(Array));
    expect(fixture.nativeElement.textContent).toContain('Happy to help!');
    expect(chat.isTyping()).toBe(false);
  });
});
