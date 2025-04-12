import { ChangeDetectionStrategy, Component, effect, EventEmitter, inject, Input, Output, Signal } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { injectStore, ISender, STORE_DISPATCHER_TOKEN } from '@cqrs';
import { DomainDecoators } from '#domain';
import { ApplicationRequest, ApplicationTokens } from '#application';

@Component({
  selector: 'app-verification-form',
  standalone: false,
  templateUrl: './verification-form.component.html',
  styleUrl: './verification-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VerificationFormComponent {
  @Input() public email = '';
  @Output() public changeIsLoadingVerificationUser = new EventEmitter<boolean>();

  private readonly _dispather = inject(STORE_DISPATCHER_TOKEN);

  private readonly _sender: ISender = inject(ApplicationTokens.SenderToken);
  private readonly _authorizationStore = injectStore(ApplicationTokens.AUTHORIZATION_STORE);


  private readonly _formBuilder = inject(FormBuilder);
  public readonly isLoadingVerificationUser: Signal<boolean>;
  public readonly isErrorVerificationUser: Signal<boolean>;
  public readonly isTimeoutRepeatSendCode: Signal<number>;
  public verficationForm = this._formBuilder.group({
    code: ['', [Validators.required]],
  });

  constructor() {
    this.isLoadingVerificationUser = this._authorizationStore.timeoutRepeatSendCode.status.isPending;
    this.isErrorVerificationUser = this._authorizationStore.timeoutRepeatSendCode.status.isError;
    this.isTimeoutRepeatSendCode = this._authorizationStore.timeoutRepeatSendCode.value;
    effect(() => {
      this.changeIsLoadingVerificationUser.emit(this.isLoadingVerificationUser());
    });
  }

  @DomainDecoators.DebugMethod()
  onSubmit(): void {
    const code = this.verficationForm.value.code;
    if (!code) { return; }
    this._dispather.send(new ApplicationRequest.user.UserVerificationAction(code));
    this.verficationForm.reset();
  }

  @DomainDecoators.DebugMethod()
  onSendCode(): void {
    if (this.isTimeoutRepeatSendCode() > 0) { return; }
    this._dispather.send(new ApplicationRequest.user.UserVerificationSendCodeAction());
    this.verficationForm.reset();
  }
}
