import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgReduxModule} from '@angular-redux/store';
import {NgRedux, DevToolsExtension} from '@angular-redux/store';
import {rootReducer, ArchitectUIState} from './ThemeOptions/store';
import {ConfigActions} from './ThemeOptions/store/config.actions';
import {AppRoutingModule} from './app-routing.module';
import {LoadingBarRouterModule} from '@ngx-loading-bar/router';

import { NgxPayPalModule } from 'ngx-paypal';

// import { PayPalModule } from './paypal';

import {CommonModule} from '@angular/common';
import {AppComponent} from './app.component';

import { Interceptor } from './interceptor';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';

import { CountdownTimerModule } from 'ngx-countdown-timer';
// import { CountdownModule } from 'ngx-countdown';

import { Ng2SearchPipeModule } from 'ng2-search-filter';
import {NgxPaginationModule} from 'ngx-pagination';

// BOOTSTRAP COMPONENTS

import {AngularFontAwesomeModule} from 'angular-font-awesome';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {PerfectScrollbarModule} from 'ngx-perfect-scrollbar';
import {PERFECT_SCROLLBAR_CONFIG} from 'ngx-perfect-scrollbar';
import {PerfectScrollbarConfigInterface} from 'ngx-perfect-scrollbar';
import {LaddaModule} from 'angular2-ladda';
import {NgxLoadingModule} from 'ngx-loading';
import {RoundProgressModule} from 'angular-svg-round-progressbar';
import {SweetAlert2Module} from '@toverux/ngx-sweetalert2';
import {ToastrModule} from 'ngx-toastr';
import {SlickCarouselModule} from 'ngx-slick-carousel';
import {CalendarModule, DateAdapter} from 'angular-calendar';
import {adapterFactory} from 'angular-calendar/date-adapters/date-fns';
import {CountUpModule} from 'countup.js-angular2';
import {AgmCoreModule} from '@agm/core';
import {ImageCropperModule} from 'ngx-image-cropper';
import {NgBootstrapFormValidationModule} from 'ng-bootstrap-form-validation';
import {AngularStickyThingsModule} from '@w11k/angular-sticky-things';
import {NouisliderModule} from 'ng2-nouislider';
import {NgSelectModule} from '@ng-select/ng-select';
import {SelectDropDownModule} from 'ngx-select-dropdown';
import {NgMultiSelectDropDownModule} from 'ng-multiselect-dropdown';
import {JwBootstrapSwitchNg2Module} from 'jw-bootstrap-switch-ng2';
import {AngularEditorModule} from '@kolkov/angular-editor';
import {TextMaskModule} from 'angular2-text-mask';
import {ClipboardModule} from 'ngx-clipboard';
import {TextareaAutosizeModule} from 'ngx-textarea-autosize';
import {ColorPickerModule} from 'ngx-color-picker';
import {DropzoneModule} from 'ngx-dropzone-wrapper';
import {DROPZONE_CONFIG} from 'ngx-dropzone-wrapper';
import {DropzoneConfigInterface} from 'ngx-dropzone-wrapper';
import {ChartsModule} from 'ng2-charts';

// ANGULAR MATERIAL COMPONENTS

import {MatCheckboxModule, MatRippleModule} from '@angular/material';
import {MatButtonModule} from '@angular/material';
import {MatInputModule} from '@angular/material/input';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatSliderModule} from '@angular/material/slider';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatMenuModule} from '@angular/material/menu';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import {MatStepperModule} from '@angular/material/stepper';
import {MatTabsModule} from '@angular/material/tabs';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTreeModule} from '@angular/material/tree';

// LAYOUT

import {BaseLayoutComponent} from './Layout/base-layout/base-layout.component';
import {AppsLayoutComponent} from './Layout/apps-layout/apps-layout.component';
import {PagesLayoutComponent} from './Layout/pages-layout/pages-layout.component';
import {ThemeOptions} from './theme-options';
import {OptionsDrawerComponent} from './ThemeOptions/options-drawer/options-drawer.component';
import {PageTitleComponent} from './Layout/Directives/page-title/page-title.component';

// HEADER

import {HeaderComponent} from './Layout/Directives/header/header.component';
import {DotsComponent} from './Layout/Directives/header/elements/dots/dots.component';
import {SearchBoxComponent} from './Layout/Directives/header/elements/search-box/search-box.component';
import {MegamenuComponent} from './Layout/Directives/header/elements/mega-menu/mega-menu.component';
import {MegapopoverComponent} from './Layout/Directives/header/elements/mega-menu/elements/megapopover/megapopover.component';
import {UserBoxComponent} from './Layout/Directives/header/elements/user-box/user-box.component';
import {DrawerComponent} from './Layout/Directives/header/elements/drawer/drawer.component';
import {ParticipantLeftMenuComponent} from './Layout/Directives/header/elements/participant-left-menu/participant-left-menu.component';

// SIDEBAR

import {SidebarComponent} from './Layout/Directives/sidebar/sidebar.component';
import {LogoComponent} from './Layout/Directives/sidebar/elements/logo/logo.component';

// FOOTER

import {FooterComponent} from './Layout/Directives/footer/footer.component';
import {FooterDotsComponent} from './Layout/Directives/footer/elements/footer-dots/footer-dots.component';
import {FooterMenuComponent} from './Layout/Directives/footer/elements/footer-menu/footer-menu.component';


//study

import { StudiesComponent } from './Components/DemoPages/study/studies/studies.component';


// Pages

import {ForgotPasswordComponent} from './Components/DemoPages/UserPages/forgot-password/forgot-password.component';
import {ForgotPasswordBoxedComponent} from './Components/DemoPages/UserPages/forgot-password-boxed/forgot-password-boxed.component';
import {LoginBoxedComponent} from './Components/DemoPages/UserPages/login-boxed/login-boxed.component';
import {LoginComponent} from './Components/DemoPages/UserPages/login/login.component';
import {RegisterBoxedComponent} from './Components/DemoPages/UserPages/register-boxed/register-boxed.component';
import {RegisterComponent} from './Components/DemoPages/UserPages/register/register.component';


// Apex Charts

import {NgApexchartsModule} from 'ng-apexcharts';

// Gauges Charts

import {GaugeModule} from 'angular-gauge';
import {TrendModule} from 'ngx-trend';

// Angular Material


import { ResearcherComponent } from './Components/DemoPages/UserPages/researcher/researcher.component';
import { SignUpComponent } from './Components/DemoPages/UserPages/sign-up/sign-up.component';
import { UserLoginComponent } from './Components/DemoPages/UserPages/user-login/user-login.component';
import { UserBoxParticipantComponent } from './Layout/Directives/header/elements/user-box-participant/user-box-participant.component';
import { AccountsParticipantsComponent } from './Components/DemoPages/Dashboards/accounts-participants/accounts-participants.component';
import { AccountResearcherComponent } from './Components/DemoPages/Dashboards/account-researcher/account-researcher.component';
import { UserBoxAdminComponent } from './Layout/Directives/header/elements/user-box-admin/user-box-admin.component';
import { EditAdminComponent } from './Components/DemoPages/Dashboards/edit-admin/edit-admin.component';
import { UpdatepasswordADminComponent } from './Components/DemoPages/Dashboards/updatepassword-admin/updatepassword-admin.component';
import { UserBoxCommonComponent } from './Layout/Directives/header/elements/user-box-common/user-box-common.component';
import { AboutYouComponent } from './Components/Demographics/about-you/about-you.component';
import { QuestionsComponent } from './Components/Demographics/questions/questions.component';
import { AddQuestionsComponent } from './Components/AdminDemographics/add-questions/add-questions.component';
import { TermsConditionsComponent } from './Components/DemoPages/UserPages/terms-conditions/terms-conditions.component';
import { PrvicyPoliciesComponent } from './Components/DemoPages/UserPages/prvicy-policies/prvicy-policies.component';
import { TermsConditionComponent } from './Components/DemoPages/Dashboards/terms-condition/terms-condition.component';
import { PrivacyPolicyComponent } from './Components/DemoPages/Dashboards/privacy-policy/privacy-policy.component';
import { TermsUserComponent } from './Components/DemoPages/Dashboards/terms-user/terms-user.component';
import { PolicyUserComponent } from './Components/DemoPages/Dashboards/policy-user/policy-user.component';
import { HeaderPageComponent } from './Components/DemoPages/Dashboards/header-page/header-page.component';
import { ChangePassowrdUserComponent } from './Components/DemoPages/UserPages/change-passowrd-user/change-passowrd-user.component';
import { EditPolicyComponent } from './Components/DemoPages/UserPages/edit-policy/edit-policy.component';
import { EditProfileComponent } from './Components/DemoPages/UserPages/edit-profile/edit-profile.component';
import { EditTermsComponent } from './Components/DemoPages/UserPages/edit-terms/edit-terms.component';
import { UpdatePasswordUserComponent } from './Components/DemoPages/UserPages/update-password-user/update-password-user.component';
import { VerifyEmailComponent } from './Components/DemoPages/UserPages/verify-email/verify-email.component';
import { QuestionCategoryComponent } from './Components/AdminDemographics/question-category/question-category.component';
import { QuestionListComponent } from './Components/AdminDemographics/question-list/question-list.component';
import { OverviewResearcherUserComponent } from './Components/DemoPages/Dashboards/overview-researcher-user/overview-researcher-user.component';
import { OverviewParticipantUserComponent } from './Components/DemoPages/Dashboards/overview-participant-user/overview-participant-user.component';
import { ParticipantUserListComponent } from './Components/DemoPages/Dashboards/participant-user-list/participant-user-list.component';
import { ResearcherUserListComponent } from './Components/DemoPages/Dashboards/researcher-user-list/researcher-user-list.component';
import { WorkInProgressComponent } from './Components/DemoPages/Dashboards/work-in-progress/work-in-progress.component';
import { AnswerListComponent } from './Components/AdminDemographics/answer-list/answer-list.component';
import { NewStudyComponent } from './Components/Researcher/new-study/new-study.component';
import { StudyDescriptionComponent } from './Components/Researcher/study-description/study-description.component';
import { StudyPublishedComponent } from './Components/Researcher/study-published/study-published.component';
// import { PaymentTestComponent } from './Components/Researcher/payment-test/payment-test.component';
import { UnSuccessfulPayComponent } from './Components/Researcher/unsuccessful-pay/unsuccessful-pay.component';
import { EditStudyComponent } from './Components/Researcher/edit-study/edit-study.component';
import { EditStudyDescriptionComponent } from './Components/Researcher/edit-study-description/edit-study-description.component';
import { ConfirmPublishComponent } from './Components/Researcher/confirm-publish/confirm-publish.component';
import { ListOfUnpublishedStudyComponent } from './Components/Researcher/list-of-unpublished-study/list-of-unpublished-study.component';
import * as $ from 'jquery';
import { CopyStudyComponent } from './Components/Researcher/copy-study/copy-study.component';
import { StudyAudienceComponent } from './Components/Researcher/study-audience/study-audience.component';
import { AudienceQuestionListComponent } from './Components/Researcher/audience-question-list/audience-question-list.component';
import { ActiveStudyComponent } from './Components/Researcher/active-study/active-study.component';
import { CompleteStudyComponent } from './Components/Researcher/complete-study/complete-study.component';
import { TermsOfUseComponent } from './Components/DemoPages/Dashboards/terms-of-use/terms-of-use.component';
import { UsertermsComponent } from './Components/DemoPages/Dashboards/userterms/userterms.component';
import { UserpolicyComponent } from './Components/DemoPages/Dashboards/userpolicy/userpolicy.component';
import { ResearcherstudydataComponent } from './Components/DemoPages/Dashboards/researcherstudydata/researcherstudydata.component';
import { EditTermsOfUseComponent } from './Components/DemoPages/Dashboards/edit-terms-of-use/edit-terms-of-use.component';
import { ShowFilledQuestionComponent } from './Components/DemoPages/Dashboards/show-filled-question/show-filled-question.component';
import { StudyListComponent } from './Components/ParticipantStudy/study-list/study-list.component';
import { EditNewStudyComponent } from './Components/Researcher/edit-new-study/edit-new-study.component';
import { EditNewStudyDEscriptionComponent } from './Components/Researcher/edit-new-study-description/edit-new-study-description.component';
import { NumberOfParticipantComponent } from './Components/DemoPages/Dashboards/number-of-participant/number-of-participant.component';
import { NumberOfStudiesComponent } from './Components/DemoPages/Dashboards/number-of-studies/number-of-studies.component';
import { UniversityNameComponent } from './Components/DemoPages/Dashboards/university-name/university-name.component';
import { AboutStudiesComponent } from './Components/AdminStudies/about-studies/about-studies.component';
import { AdminpublishstudyComponent } from './Components/AdminStudies/adminpublishstudy/adminpublishstudy.component';
import { AdminCompleteStudyComponent } from './Components/AdminStudies/admin-complete-study/admin-complete-study.component';
import { AdminActiveStudyComponent } from './Components/AdminStudies/admin-active-study/admin-active-study.component';
import { AdminInactiveStudyComponent } from './Components/AdminStudies/admin-inactive-study/admin-inactive-study.component';
import { StudyDetailsComponent } from './Components/ParticipantStudy/study-details/study-details.component';
import { StartStudyComponent } from './Components/ParticipantStudy/start-study/start-study.component';
import { ResearcherStudyDetailsComponent } from './Components/Researcher/admin-study-details/admin-study-details.component';
import { StudySubmissionComponent } from './Components/Researcher/study-submission/study-submission.component';
import { AdminStudyDetailsComponent } from './Components/AdminStudies/admin-study-details/admin-study-details.component';
import { RejectedStudyComponent } from './Components/Researcher/rejected-study/rejected-study.component';
import { CandidateDetailsComponent } from './Components/Researcher/candidate-details/candidate-details.component';
import { ActiveStudyDetailsComponent } from './Components/Researcher/active-study-details/active-study-details.component';
import { ActiveCandidateInfoListComponent } from './Components/Researcher/active-candidate-info-list/active-candidate-info-list.component';
import { AcceptRejectStudyListComponent } from './Components/Researcher/accept-reject-study-list/accept-reject-study-list.component';
import { AdminActiveStudyDetailsComponent } from './Components/AdminStudies/admin-active-study-details/admin-active-study-details.component';
import { ActiveUserListAdminComponent } from './Components/AdminStudies/active-user-list-admin/active-user-list-admin.component';
import { StudySubmitListAdminComponent } from './Components/AdminStudies/study-submit-list-admin/study-submit-list-admin.component';
import { CompleteStudyDetailsAdminComponent } from './Components/AdminStudies/complete-study-details-admin/complete-study-details-admin.component';
import { InActiveStudyAdminComponent } from './Components/AdminStudies/in-active-study-admin/in-active-study-admin.component';
import { AdminWalletComponent } from './Components/AdminStudies/admin-wallet/admin-wallet.component';
import { StudyPaymentListComponent } from './Components/AdminStudies/study-payment-list/study-payment-list.component';
import { ParticipantStudySubmissionComponent } from './Components/ParticipantStudy/participant-study-submission/participant-study-submission.component';
import { PartiicpantTotalSubmitComponent } from './Components/ParticipantStudy/partiicpant-total-submit/partiicpant-total-submit.component';
import { PartiicpantAcceptRejectComponent } from './Components/ParticipantStudy/partiicpant-accept-reject/partiicpant-accept-reject.component';
import { PartiicpantRejectStudyComponent } from './Components/ParticipantStudy/partiicpant-reject-study/partiicpant-reject-study.component';
import { PartiicpantTotalAttepmtComponent } from './Components/ParticipantStudy/partiicpant-total-attepmt/partiicpant-total-attepmt.component';
import { NewMessageComponent } from './Components/ResearcherMessage/new-message/new-message.component';
import { InboxComponent } from './Components/ResearcherMessage/inbox/inbox.component';
import { ArchiveComponent } from './Components/ResearcherMessage/archive/archive.component';
import { SentComponent } from './Components/ResearcherMessage/sent/sent.component';
import { ComplteStudyDetailsComponent } from './Components/Researcher/complte-study-details/complte-study-details.component';
import { RejectedStudyDetailsComponent } from './Components/Researcher/rejected-study-details/rejected-study-details.component';
import { MessageDetailsComponent } from './Components/ResearcherMessage/message-details/message-details.component';
import { InboxMessageDetailsComponent } from './Components/ResearcherMessage/inbox-message-details/inbox-message-details.component';
import { ParticipantNewMessageComponent } from './Components/ParticipantMessage/participant-new-message/participant-new-message.component';
import { ParticipantSEntComponent } from './Components/ParticipantMessage/participant-sent/participant-sent.component';
import { ParticipantInboxComponent } from './Components/ParticipantMessage/participant-inbox/participant-inbox.component';
import { ParticipantInboxDetailsComponent } from './Components/ParticipantMessage/participant-inbox-details/participant-inbox-details.component';
import { ParticipantsentDetailsComponent } from './Components/ParticipantMessage/participantsent-details/participantsent-details.component';
import { DescriptionStudyComponent } from './Components/Researcher/description-study/description-study.component';
import { CreateNewMessageComponent } from './Components/ParticipantMessage/create-new-message/create-new-message.component';
import { SentMessageComponent } from './Components/AdminMessage/sent-message/sent-message.component';
import { InboxMessageComponent } from './Components/AdminMessage/inbox-message/inbox-message.component';
import { AdminNewMessageComponent } from './Components/AdminMessage/admin-new-message/admin-new-message.component';
import { AdmininboxmessagedetailsComponent } from './Components/AdminMessage/admininboxmessagedetails/admininboxmessagedetails.component';
import { AdminsentmessagedetailsComponent } from './Components/AdminMessage/adminsentmessagedetails/adminsentmessagedetails.component';
import { TrackActiveStudyComponent } from './Components/Researcher/track-active-study/track-active-study.component';
import { CreateNewMessageResearcherComponent } from './Components/Researcher/create-new-message-researcher/create-new-message-researcher.component';
import { TrackStudyDetailsComponent } from './Components/Researcher/track-study-details/track-study-details.component';
import { AfterStudySubmissionComponent } from './Components/ParticipantStudy/after-study-submission/after-study-submission.component';
import { ParticipantarchiveComponent } from './Components/ParticipantMessage/participantarchive/participantarchive.component';
import { BlackListComponent } from './Components/Researcher/black-list/black-list.component';
import { WhiteListComponent } from './Components/Researcher/white-list/white-list.component';
import { PaymentService } from './payment.service';
import { CartService } from './services/cart.service';
import { TransactionComponent } from './Components/Researcher/transaction/transaction.component';
import { AdminTransactionComponent } from './Components/AdminStudies/admin-transaction/admin-transaction.component';
import { ParticipantTransctionsComponent } from './Components/ParticipantStudy/participant-transctions/participant-transctions.component';
import { AccountAdminComponent } from './Components/DemoPages/Dashboards/account-admin/account-admin.component';
import { ParticipantRatingListComponent } from './Components/Researcher/participant-rating-list/participant-rating-list.component';
import { RangeAnswersListComponent } from './Components/AdminDemographics/range-answers-list/range-answers-list.component';
import { BlankStudyComponent } from './Components/ParticipantStudy/blank-study/blank-study.component';
import { HelpComponent } from './Components/HelpSection/help/help.component';
import { HelpContentComponent } from './Components/HelpSection/help-content/help-content.component';
import { HelpFAQComponent } from './Components/HelpSection/help-faq/help-faq.component';
import { ResearcherHelpFAQComponent } from './Components/HelpSection/researcher-help-faq/researcher-help-faq.component';
import { ResearcherHelpHeaderComponent } from './Components/HelpSection/researcher-help-header/researcher-help-header.component';
import { ResearcherHelpContentComponent } from './Components/HelpSection/researcher-help-content/researcher-help-content.component';
import { LessThanTwoComponent } from './Components/ParticipantFilterStudy/less-than-two/less-than-two.component';
import { LessThanFourComponent } from './Components/ParticipantFilterStudy/less-than-four/less-than-four.component';
import { MoreThanFourComponent } from './Components/ParticipantFilterStudy/more-than-four/more-than-four.component';
import { LessThanTwoFilterComponent } from './Components/ParticipantFilterStudy/less-than-two-filter/less-than-two-filter.component';
import { LessThanFourFilterComponent } from './Components/ParticipantFilterStudy/less-than-four-filter/less-than-four-filter.component';
import { MoreThanFourFilterComponent } from './Components/ParticipantFilterStudy/more-than-four-filter/more-than-four-filter.component';
import { StudyParticipationComponent } from './Components/ParticipantFilterStudy/study-participation/study-participation.component';
import { AdminfilterComponent } from './Components/DemoPages/Dashboards/adminfilter/adminfilter.component';
import { AdminfilterquestionlistComponent } from './Components/DemoPages/Dashboards/adminfilterquestionlist/adminfilterquestionlist.component';
import { AdminfilteranswerlistComponent } from './Components/DemoPages/Dashboards/adminfilteranswerlist/adminfilteranswerlist.component';
import { AdminfilteruserdetailsComponent } from './Components/DemoPages/Dashboards/adminfilteruserdetails/adminfilteruserdetails.component';
import { ParticipantstudylistComponent } from './Components/ParticipantFilterStudy/participantstudylist/participantstudylist.component';
import { WalletParticipantComponent } from './Components/DemoPages/Dashboards/wallet-participant/wallet-participant.component';
import { ResearcherFirstloginComponent } from './Components/DemoPages/Dashboard/researcher-firstlogin/researcher-firstlogin.component';
import { ResearcherFirstLoginComponent } from './Components/DemoPages/Dashboards/researcher-first-login/researcher-first-login.component';
import { AdddetailsresearcherfirstpageComponent } from './Components/DemoPages/Dashboards/adddetailsresearcherfirstpage/adddetailsresearcherfirstpage.component';
import { WalletResearcherComponent } from './Components/DemoPages/Dashboards/wallet-researcher/wallet-researcher.component';
import { SliderContentComponent } from './Components/DemoPages/Dashboards/slider-content/slider-content.component';
import { PagesContentComponent } from './Components/DemoPages/Dashboards/pages-content/pages-content.component';
import { CompleteParticipantListComponent } from './Components/Researcher/complete-participant-list/complete-participant-list.component';
import { EligibleCndidatesListComponent } from './Components/DemoPages/Dashboards/eligible-cndidates-list/eligible-cndidates-list.component';
import { TrackStudyListDetailsComponent } from './Components/Researcher/track-study-list/track-study-list-details/track-study-list-details.component';
import { TrackAttemptedStudyComponent } from './Components/Researcher/track-study-list/track-attempted-study/track-attempted-study.component';
import { TrackCompletedStudyComponent } from './Components/Researcher/track-study-list/track-completed-study/track-completed-study.component';
import { TrackAcceptedRejectedStudyComponent } from './Components/Researcher/track-study-list/track-accepted-rejected-study/track-accepted-rejected-study.component';
import { ResearcherHelpSectionComponent } from './Components/DemoPages/Dashboards/researcher-help-section/researcher-help-section.component';
import { ParticipantFistLoginComponent } from './Components/DemoPages/Dashboards/participant-fist-login/participant-fist-login.component';
import { EditPauseStudyComponent } from './Components/Researcher/edit-pause-study/edit-pause-study.component';
import { PauseStudyEditComponent } from './Components/Researcher/pause-study-edit/pause-study-edit.component';
import { ActiveStudyReportComponent } from './Components/AdminStudies/active-study-report/active-study-report.component';
import { ActiveStudyDashboardComponent } from './Components/Researcher/active-study-dashboard/active-study-dashboard.component';
import { AllTermsConditionsComponent } from './Components/DemoPages/Dashboards/all-terms-conditions/all-terms-conditions.component';
import { ForgotCompletionCodeComponent } from './Components/ParticipantStudy/forgot-completion-code/forgot-completion-code.component';
import { ForgotcompletioncodeComponent } from './Components/DemoPages/UserPages/forgotcompletioncode/forgotcompletioncode.component';
import { ResearcherSideComponent } from './Components/DemoPages/Dashboards/researcher-side/researcher-side.component';
import { HelpmessageComponent } from './Components/ParticipantMessage/helpmessage/helpmessage.component';
import { ResearcherHelpmessageComponent } from './Components/ResearcherMessage/researcher-helpmessage/researcher-helpmessage.component';


// firstlogin modal open

// import { NgbdModalContent } from './Components/DemoPages/Dashboards/header-page/header-page.component';


const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

const DEFAULT_DROPZONE_CONFIG: DropzoneConfigInterface = {
  // Change this to your upload POST address:
  url: 'https://httpbin.org/post',
  maxFilesize: 50,
  acceptedFiles: 'image/*'
};

@NgModule({
  declarations: [
    // LAYOUT
    AppComponent,
    // NgbdModalContent,
    BaseLayoutComponent,
    AppsLayoutComponent,
    PagesLayoutComponent,
    OptionsDrawerComponent,
    PageTitleComponent,

    // HEADER

    HeaderComponent,
    DotsComponent,
    SearchBoxComponent,
    MegamenuComponent,
    MegapopoverComponent,
    UserBoxComponent,
    DrawerComponent,
    ParticipantLeftMenuComponent,

    // SIDEBAR

    SidebarComponent,
    LogoComponent,

    // FOOTER

    FooterComponent,
    FooterDotsComponent,
    FooterMenuComponent,

    // User Pages

    ForgotPasswordComponent,
    ForgotPasswordBoxedComponent,
    LoginBoxedComponent,
    LoginComponent,
    RegisterBoxedComponent,
    RegisterComponent,

    // ANGULAR MATERIAL

    
    ResearcherComponent,
    SignUpComponent,
    StudiesComponent,
    UserLoginComponent,
    UserBoxParticipantComponent,
    AccountsParticipantsComponent,
    AccountResearcherComponent,
    UserBoxAdminComponent,
    EditAdminComponent,
    UpdatepasswordADminComponent,
    UserBoxCommonComponent,
    AboutYouComponent,
    QuestionsComponent,
    AddQuestionsComponent,
    CopyStudyComponent,
    
    TermsConditionsComponent,
    PrvicyPoliciesComponent,
    TermsConditionComponent,
    PrivacyPolicyComponent,
    TermsUserComponent,
    PolicyUserComponent,
    HeaderPageComponent,
    ChangePassowrdUserComponent,
    EditPolicyComponent,
    EditProfileComponent,
    EditTermsComponent,
    UpdatePasswordUserComponent,
    VerifyEmailComponent,
    QuestionCategoryComponent,
    QuestionListComponent,
    OverviewResearcherUserComponent,
    OverviewParticipantUserComponent,
    ParticipantUserListComponent,
    ResearcherUserListComponent,
    WorkInProgressComponent,
    AnswerListComponent,
    NewStudyComponent,
    StudyDescriptionComponent,
    StudyPublishedComponent,
    // PaymentTestComponent,
    UnSuccessfulPayComponent,
    EditStudyComponent,
    EditStudyDescriptionComponent,
    ConfirmPublishComponent,
    ListOfUnpublishedStudyComponent,
    StudyAudienceComponent,
    AudienceQuestionListComponent,
    ActiveStudyComponent,
    CompleteStudyComponent,
    TermsOfUseComponent,
    UsertermsComponent,
    UserpolicyComponent,
    ResearcherstudydataComponent,
    EditTermsOfUseComponent,
    ShowFilledQuestionComponent,
    StudyListComponent,
    EditNewStudyComponent,
    EditNewStudyDEscriptionComponent,
    NumberOfParticipantComponent,
    NumberOfStudiesComponent,
    UniversityNameComponent,
    AboutStudiesComponent,
    AdminpublishstudyComponent,
    AdminCompleteStudyComponent,
    AdminActiveStudyComponent,
    AdminInactiveStudyComponent,
    StudyDetailsComponent,
    StartStudyComponent,
    ResearcherStudyDetailsComponent,
    StudySubmissionComponent,
    AdminStudyDetailsComponent,
    RejectedStudyComponent,
    CandidateDetailsComponent,
    ActiveStudyDetailsComponent,
    ActiveCandidateInfoListComponent,
    AcceptRejectStudyListComponent,
    AdminActiveStudyDetailsComponent,
    ActiveUserListAdminComponent,
    StudySubmitListAdminComponent,
    CompleteStudyDetailsAdminComponent,
    InActiveStudyAdminComponent,
    AdminWalletComponent,
    StudyPaymentListComponent,
    ParticipantStudySubmissionComponent,
    PartiicpantTotalSubmitComponent,
    PartiicpantAcceptRejectComponent,
    PartiicpantRejectStudyComponent,
    PartiicpantTotalAttepmtComponent,
    NewMessageComponent,
    InboxComponent,
    ArchiveComponent,
    SentComponent,
    ComplteStudyDetailsComponent,
    RejectedStudyDetailsComponent,
    MessageDetailsComponent,
    InboxMessageDetailsComponent,
    ParticipantNewMessageComponent,
    ParticipantSEntComponent,
    ParticipantInboxComponent,
    ParticipantInboxDetailsComponent,
    ParticipantsentDetailsComponent,
    DescriptionStudyComponent,
    CreateNewMessageComponent,
    SentMessageComponent,
    InboxMessageComponent,
    AdminNewMessageComponent,
    AdmininboxmessagedetailsComponent,
    AdminsentmessagedetailsComponent,
    TrackActiveStudyComponent,
    CreateNewMessageResearcherComponent,
    TrackStudyDetailsComponent,
    AfterStudySubmissionComponent,
    ParticipantarchiveComponent,
    BlackListComponent,
    WhiteListComponent,
    TransactionComponent,
    AdminTransactionComponent,
    ParticipantTransctionsComponent,
    AccountAdminComponent,
    ParticipantRatingListComponent,
    RangeAnswersListComponent,
    BlankStudyComponent,
    HelpComponent,
    HelpContentComponent,
    HelpFAQComponent,
    ResearcherHelpFAQComponent,
    ResearcherHelpHeaderComponent,
    ResearcherHelpContentComponent,
    LessThanTwoComponent,
    LessThanFourComponent,
    MoreThanFourComponent,
    LessThanTwoFilterComponent,
    LessThanFourFilterComponent,
    MoreThanFourFilterComponent,
    StudyParticipationComponent,
    AdminfilterComponent,
    AdminfilterquestionlistComponent,
    AdminfilteranswerlistComponent,
    AdminfilteruserdetailsComponent,
    ParticipantstudylistComponent,
    WalletParticipantComponent,
    ResearcherFirstloginComponent,
    ResearcherFirstLoginComponent,
    AdddetailsresearcherfirstpageComponent,
    WalletResearcherComponent,
    SliderContentComponent,
    PagesContentComponent,
    CompleteParticipantListComponent,
    EligibleCndidatesListComponent,
    TrackStudyListDetailsComponent,
    TrackAttemptedStudyComponent,
    TrackCompletedStudyComponent,
    TrackAcceptedRejectedStudyComponent,
    ResearcherHelpSectionComponent,
    ParticipantFistLoginComponent,
    EditPauseStudyComponent,
    PauseStudyEditComponent,
    ActiveStudyReportComponent,
    ActiveStudyDashboardComponent,
    AllTermsConditionsComponent,
    ForgotCompletionCodeComponent,
    ForgotcompletioncodeComponent,
    ResearcherSideComponent,
    HelpmessageComponent,
    ResearcherHelpmessageComponent,
  ],
  // entryComponents: [NgbdModalContent],
  imports: [
    BrowserModule,CountdownTimerModule.forRoot(),NgxPayPalModule,
    Ng2SearchPipeModule,
    NgxPaginationModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgReduxModule,
    CommonModule,
    LoadingBarRouterModule,
    HttpClientModule,

    // Angular Bootstrap Components

    PerfectScrollbarModule,
    NgbModule,
    AngularFontAwesomeModule,
    LaddaModule,
    FormsModule,
    ReactiveFormsModule,
    NgBootstrapFormValidationModule.forRoot(),
    NgxLoadingModule.forRoot({}),
    RoundProgressModule,
    SweetAlert2Module.forRoot({
      buttonsStyling: false,
      customClass: 'modal-content',
      confirmButtonClass: 'btn btn-primary',
      cancelButtonClass: 'btn'
    }),
    ToastrModule.forRoot(),
    SlickCarouselModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    CountUpModule,
    AgmCoreModule.forRoot({
      // please get your own API key here:
      // https://developers.google.com/maps/documentation/javascript/get-api-key?hl=en
      apiKey: ''
    }),
    ImageCropperModule,
    AngularStickyThingsModule,
    NouisliderModule,
    NgSelectModule,
    SelectDropDownModule,
    NgMultiSelectDropDownModule.forRoot(),
    JwBootstrapSwitchNg2Module,
    AngularEditorModule,
    HttpClientModule,
    TextMaskModule,
    ClipboardModule,
    TextareaAutosizeModule,
    ColorPickerModule,
    DropzoneModule,

    // Charts

    ChartsModule,
    NgApexchartsModule,
    GaugeModule.forRoot(),
    TrendModule,

    // Angular Material Components

    MatCheckboxModule,
    MatCheckboxModule,
    MatButtonModule,
    MatInputModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatRadioModule,
    MatSelectModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatMenuModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatStepperModule,
    MatTabsModule,
    MatExpansionModule,
    MatButtonToggleModule,
    MatChipsModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatDialogModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatTreeModule,
    MatRippleModule,
    // PayPalModule.init({
    //   clientId: 'sb', // Using sandbox for testing purposes only
    //   currency: 'EUR',
    //   commit: true,
    //   //vault: true,
    //   //disableFunding: 'credit,card'
    // })
  ],
  providers: [
    {
      provide:
      PERFECT_SCROLLBAR_CONFIG,
      // DROPZONE_CONFIG,
      useValue:
      DEFAULT_PERFECT_SCROLLBAR_CONFIG,
      // DEFAULT_DROPZONE_CONFIG,
     
    },
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    {provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true},
    ConfigActions,
    ThemeOptions,
    PaymentService,
    CartService

  ],
  bootstrap: [AppComponent]
})

export class AppModule {
  constructor(private ngRedux: NgRedux<ArchitectUIState>,
              private devTool: DevToolsExtension) {

    this.ngRedux.configureStore(
      rootReducer,
      {} as ArchitectUIState,
      [],
      [devTool.isEnabled() ? devTool.enhancer() : f => f]
    );

  }
}
