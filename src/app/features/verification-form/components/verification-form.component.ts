import { ChangeDetectionStrategy, Component, effect, EventEmitter, inject, Inject, Input, Output, Signal } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DomainDecoators } from '#domain';
import { ApplicationServices, ApplicationTokens } from '#application';


@Component({
  selector: 'app-verification-form',
  standalone: false,
  templateUrl: './verification-form.component.html',
  styleUrl: './verification-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VerificationFormComponent {

  private readonly _authorizationSerivce: ApplicationServices.IAuthorizeService;
  private readonly _formBuilder = inject(FormBuilder);

  public readonly isLoadingVerificationUser$: Signal<boolean>;
  public readonly isErrorVerificationUser$: Signal<boolean>;
  public readonly isTimeoutRepeatSendCode$: Signal<number>;

  @Input() public email: string = "";

  @Output() public changeIsLoadingVerificationUser = new EventEmitter<boolean>();

  public verficationForm = this._formBuilder.group({
    code: ['', [Validators.required]]
  });

  constructor(
    @Inject(ApplicationTokens.AuthorizationServiceToken) authorizationSerivce: ApplicationServices.IAuthorizeService
  ) {
    this._authorizationSerivce = authorizationSerivce
    this.isLoadingVerificationUser$ = authorizationSerivce.isLoadingVerificationUser$;
    this.isErrorVerificationUser$ = authorizationSerivce.isErrorVerificationUser$;
    this.isTimeoutRepeatSendCode$ = authorizationSerivce.isTimeoutRepeatSendCode$;
    effect(() => {
      this.changeIsLoadingVerificationUser.emit(this.isLoadingVerificationUser$());
    });
  }

  @DomainDecoators.DebugMethod()
  onSubmit(): void {
    const code = this.verficationForm.value.code;
    if (!code) { return; }
    this._authorizationSerivce.confirm(code);
    this.verficationForm.reset();
  }

  @DomainDecoators.DebugMethod()
  onSendCode(): void {
    if (this.isTimeoutRepeatSendCode$() > 0) { return; }
    this._authorizationSerivce.sendCode();
    this.verficationForm.reset();
  }

}
