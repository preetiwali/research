import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {BaseLayoutComponent} from './Layout/base-layout/base-layout.component';
import {PagesLayoutComponent} from './Layout/pages-layout/pages-layout.component';
import {AppsLayoutComponent} from './Layout/apps-layout/apps-layout.component';


// Pages

import {ForgotPasswordComponent} from './Components/DemoPages/UserPages/forgot-password/forgot-password.component';
import {ForgotPasswordBoxedComponent} from './Components/DemoPages/UserPages/forgot-password-boxed/forgot-password-boxed.component';
import {LoginBoxedComponent} from './Components/DemoPages/UserPages/login-boxed/login-boxed.component';
import {LoginComponent} from './Components/DemoPages/UserPages/login/login.component';
import {RegisterBoxedComponent} from './Components/DemoPages/UserPages/register-boxed/register-boxed.component';
import {RegisterComponent} from './Components/DemoPages/UserPages/register/register.component';

// Angular Material

import { ResearcherComponent } from './Components/DemoPages/UserPages/researcher/researcher.component';
import { SignUpComponent } from './Components/DemoPages/UserPages/sign-up/sign-up.component';
import { UserLoginComponent } from './Components/DemoPages/UserPages/user-login/user-login.component';
import { AccountsParticipantsComponent } from './Components/DemoPages/Dashboards/accounts-participants/accounts-participants.component';
import { AccountResearcherComponent } from './Components/DemoPages/Dashboards/account-researcher/account-researcher.component';
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
import { UserauthGuard } from './userauth.guard';
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
import { TransactionComponent } from './Components/Researcher/transaction/transaction.component';
import { AdminTransactionComponent } from './Components/AdminStudies/admin-transaction/admin-transaction.component';
import { ParticipantTransctionsComponent } from './Components/ParticipantStudy/participant-transctions/participant-transctions.component';
import { AccountAdminComponent } from './Components/DemoPages/Dashboards/account-admin/account-admin.component';
import { ParticipantRatingListComponent } from './Components/Researcher/participant-rating-list/participant-rating-list.component';
import { RangeAnswersListComponent } from './Components/AdminDemographics/range-answers-list/range-answers-list.component';
import { BlankStudyComponent } from './Components/ParticipantStudy/blank-study/blank-study.component';
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
import { ParticipantstudylistComponent } from './Components/ParticipantFilterStudy/participantstudylist/participantstudylist.component';
import { WalletParticipantComponent } from './Components/DemoPages/Dashboards/wallet-participant/wallet-participant.component';
import { ResearcherFirstLoginComponent } from './Components/DemoPages/Dashboards/researcher-first-login/researcher-first-login.component';
import { AdddetailsresearcherfirstpageComponent } from './Components/DemoPages/Dashboards/adddetailsresearcherfirstpage/adddetailsresearcherfirstpage.component';
import { CopyStudyComponent } from './Components/Researcher/copy-study/copy-study.component';
import { WalletResearcherComponent } from './Components/DemoPages/Dashboards/wallet-researcher/wallet-researcher.component';
import { SliderContentComponent } from './Components/DemoPages/Dashboards/slider-content/slider-content.component';
import { PagesContentComponent } from './Components/DemoPages/Dashboards/pages-content/pages-content.component';
import { CompleteParticipantListComponent } from './Components/Researcher/complete-participant-list/complete-participant-list.component';
import { EligibleCndidatesListComponent } from './Components/DemoPages/Dashboards/eligible-cndidates-list/eligible-cndidates-list.component';
import { TrackStudyListDetailsComponent } from './Components/Researcher/track-study-list/track-study-list-details/track-study-list-details.component';
import { TrackAttemptedStudyComponent } from './Components/Researcher/track-study-list/track-attempted-study/track-attempted-study.component';
import { TrackCompletedStudyComponent } from './Components/Researcher/track-study-list/track-completed-study/track-completed-study.component';
import { TrackAcceptedRejectedStudyComponent } from './Components/Researcher/track-study-list/track-accepted-rejected-study/track-accepted-rejected-study.component';
import { ParticipantFistLoginComponent } from './Components/DemoPages/Dashboards/participant-fist-login/participant-fist-login.component';
import { PauseStudyEditComponent } from './Components/Researcher/pause-study-edit/pause-study-edit.component';
import { ActiveStudyReportComponent } from './Components/AdminStudies/active-study-report/active-study-report.component';
import { ActiveStudyDashboardComponent } from './Components/Researcher/active-study-dashboard/active-study-dashboard.component';
import { AllTermsConditionsComponent } from './Components/DemoPages/Dashboards/all-terms-conditions/all-terms-conditions.component';
import { ForgotCompletionCodeComponent } from './Components/ParticipantStudy/forgot-completion-code/forgot-completion-code.component';
import { ResearcherSideComponent } from './Components/DemoPages/Dashboards/researcher-side/researcher-side.component';
import { HelpmessageComponent } from './Components/ParticipantMessage/helpmessage/helpmessage.component';
import { ResearcherHelpmessageComponent } from './Components/ResearcherMessage/researcher-helpmessage/researcher-helpmessage.component';

const routes: Routes = [
  {
    path: '',
    component: BaseLayoutComponent,
    children: [

      // Dashboads
      {path: 'Researcher', component: ResearcherSideComponent , canActivate: [UserauthGuard] },

      // {path: '', component: UserBoxCommonComponent, data: {extraParameter: 'home'}},
      {path: '', component: HeaderPageComponent, data: {extraParameter: 'dashboardsMenu'}},
      {path: 'termsconditions', component: TermsConditionComponent, data: {extraParameter: 'dashboardsMenu'}},
      {path: 'privacypolicies', component: PrivacyPolicyComponent, data: {extraParameter: 'dashboardsMenu'}},
      {path: 'termsconditionsuser', component: TermsUserComponent, data: {extraParameter: 'dashboardsMenu'} },
      {path: 'privacypoliciesuser', component: PolicyUserComponent, data: {extraParameter: 'dashboardsMenu'}},

      {path: 'alltermsconditions', component: AllTermsConditionsComponent, data: {extraParameter: 'dashboardsMenu'}},

      {path: 'overviewuser/:id', component: OverviewParticipantUserComponent , canActivate: [UserauthGuard] },
      {path: 'overviewresearcheruser/:id', component: OverviewResearcherUserComponent , canActivate: [UserauthGuard] },
      {path: 'participantuserlist', component: ParticipantUserListComponent, data: {extraParameter: 'elementsMenu'}, canActivate: [UserauthGuard] },
      {path: 'researcheruserlist', component: ResearcherUserListComponent, data: {extraParameter: 'elementsMenu'}, canActivate: [UserauthGuard] },
      {path: 'workinprogress', component: WorkInProgressComponent, data: {extraParameter: 'elementsMenu'}, canActivate: [UserauthGuard] },
      {path: 'dashboards/termsofuse', component: TermsOfUseComponent, data: {extraParameter: 'elementsMenu'}, canActivate: [UserauthGuard] },
      {path: 'dashboards/userterms', component: UsertermsComponent, data: {extraParameter: 'elementsMenu'}, canActivate: [UserauthGuard] },
      {path: 'dashboards/userpolicy', component: UserpolicyComponent, data: {extraParameter: 'elementsMenu'}, canActivate: [UserauthGuard] },
      {path: 'dashboards/studydata/:id', component: ResearcherstudydataComponent, data: {extraParameter: 'elementsMenu'}, canActivate: [UserauthGuard] },
      {path: 'dashboards/usertermsofuse', component: EditTermsOfUseComponent, data: {extraParameter: 'elementsMenu'}, canActivate: [UserauthGuard] },
      {path: 'dashboards/showfilledquestions/:id', component: ShowFilledQuestionComponent, data: {extraParameter: 'elementsMenu'}, canActivate: [UserauthGuard] },
      {path: 'dashboards/reports', component: NumberOfParticipantComponent, data: {extraParameter: 'elementsMenu'}, canActivate: [UserauthGuard] },
      {path: 'dashboards/numberofstudies', component: NumberOfStudiesComponent, data: {extraParameter: 'elementsMenu'}, canActivate: [UserauthGuard] },
      {path: 'dashboards/universityname', component: UniversityNameComponent, data: {extraParameter: 'elementsMenu'}, canActivate: [UserauthGuard] },
      {path: 'helpcontent', component: HelpContentComponent, data: {extraParameter: 'elementsMenu'}, canActivate: [UserauthGuard] },
      {path: 'helpFAQ', component: HelpFAQComponent, data: {extraParameter: 'elementsMenu'}, canActivate: [UserauthGuard] },
      {path: 'researcherhelpFAQ', component: ResearcherHelpFAQComponent, data: {extraParameter: 'elementsMenu'}, canActivate: [UserauthGuard] },
      {path: 'researcherhelpcontent', component: ResearcherHelpContentComponent, data: {extraParameter: 'elementsMenu'}, canActivate: [UserauthGuard] },
      {path: 'participantstudylessthantwo', component: LessThanTwoComponent, data: {extraParameter: 'elementsMenu'}, canActivate: [UserauthGuard] },
      {path: 'participantstudylessthanfour', component: LessThanFourComponent, data: {extraParameter: 'elementsMenu'}, canActivate: [UserauthGuard] },
      {path: 'participantstudymorethanfour', component: MoreThanFourComponent, data: {extraParameter: 'elementsMenu'}, canActivate: [UserauthGuard] },
      {path: 'studylessthantwofilter/:id', component: LessThanTwoFilterComponent, data: {extraParameter: 'elementsMenu'}, canActivate: [UserauthGuard] },
      {path: 'studylessthanfourfilter/:id', component: LessThanFourFilterComponent, data: {extraParameter: 'elementsMenu'}, canActivate: [UserauthGuard] },
      {path: 'studymorethanfourfilter/:id', component: MoreThanFourFilterComponent, data: {extraParameter: 'elementsMenu'}, canActivate: [UserauthGuard] },
      {path: 'studyparticipation', component: StudyParticipationComponent, data: {extraParameter: 'elementsMenu'}, canActivate: [UserauthGuard] },
      {path: 'dashboards/adminfilter', component: AdminfilterComponent, data: {extraParameter: 'elementsMenu'}, canActivate: [UserauthGuard] },
      {path: 'dashboards/adminfilterquestionlist/:id', component: AdminfilterquestionlistComponent, data: {extraParameter: 'elementsMenu'}, canActivate: [UserauthGuard] },
      {path: 'dashboards/adminfilteranswerlist/:id', component: AdminfilteranswerlistComponent, data: {extraParameter: 'elementsMenu'}, canActivate: [UserauthGuard] },
      {path: 'participantstudylist/:id', component: ParticipantstudylistComponent, data: {extraParameter: 'elementsMenu'}, canActivate: [UserauthGuard] },
      {path: 'walletparticipant', component: WalletParticipantComponent, data: {extraParameter: 'elementsMenu'}, canActivate: [UserauthGuard] },
      {path: 'researcherfirstlogin', component: ResearcherFirstLoginComponent, data: {extraParameter: 'elementsMenu'}, canActivate: [UserauthGuard] },
      {path: 'dashboards/addfirstpagedetails/:id', component: AdddetailsresearcherfirstpageComponent, data: {extraParameter: 'elementsMenu'}, canActivate: [UserauthGuard] },
      {path: 'walletresearcher', component: WalletResearcherComponent, data: {extraParameter: 'elementsMenu'}, canActivate: [UserauthGuard] },
      {path: 'content', component: SliderContentComponent, data: {extraParameter: 'elementsMenu'}, canActivate: [UserauthGuard] },
      {path: 'contentdetails/:id', component: PagesContentComponent, data: {extraParameter: 'elementsMenu'}, canActivate: [UserauthGuard] },
      {path: 'trackstudydetailslist/:id', component: TrackStudyListDetailsComponent, data: {extraParameter: 'elementsMenu'}, canActivate: [UserauthGuard] },
      {path: 'trackattemptedstudy/:id', component: TrackAttemptedStudyComponent, data: {extraParameter: 'elementsMenu'}, canActivate: [UserauthGuard] },
      {path: 'trackcompletestudy/:id', component: TrackCompletedStudyComponent, data: {extraParameter: 'elementsMenu'}, canActivate: [UserauthGuard] },
      {path: 'trackacceptrejectstudy/:id', component: TrackAcceptedRejectedStudyComponent, data: {extraParameter: 'elementsMenu'}, canActivate: [UserauthGuard] },
      {path: 'participantfirstlogin', component: ParticipantFistLoginComponent, data: {extraParameter: 'elementsMenu'}, canActivate: [UserauthGuard] },
      {path: 'forgotcompletioncode/:token', component: ForgotCompletionCodeComponent, data: {extraParameter: 'elementsMenu'}},

      // Study

      {path: 'newstudy', component: NewStudyComponent, data: {extraParameter: 'dashboardsMenu'}, canActivate: [UserauthGuard] },
      {path: 'studydescription/:id', component: StudyDescriptionComponent, data: {extraParameter: 'dashboardsMenu'}, canActivate: [UserauthGuard] },
      {path: 'studypublished/:id', component: StudyPublishedComponent, data: {extraParameter: 'dashboardsMenu'}, canActivate: [UserauthGuard] },
      // {path: 'paymenttest/:id', component: PaymentTestComponent, data: {extraParameter: 'dashboardsMenu'}, canActivate: [UserauthGuard] },
      {path: 'editstudy/:id', component: EditStudyComponent, data: {extraParameter: 'dashboardsMenu'}, canActivate: [UserauthGuard] },
      {path: 'editstudydescription/:id', component: EditStudyDescriptionComponent, data: {extraParameter: 'dashboardsMenu'}, canActivate: [UserauthGuard] },
      {path: 'confirmpublish/:id', component: ConfirmPublishComponent, data: {extraParameter: 'dashboardsMenu'}, canActivate: [UserauthGuard] },
      {path: 'unpublishedstudy', component: ListOfUnpublishedStudyComponent, data: {extraParameter: 'dashboardsMenu'}, canActivate: [UserauthGuard] },
      {path: 'studyaudience/:id', component: StudyAudienceComponent, data: {extraParameter: 'dashboardsMenu'}, canActivate: [UserauthGuard] },
      {path: 'studyaudiencequestionlist/:id/:study_id', component: AudienceQuestionListComponent, data: {extraParameter: 'dashboardsMenu'}, canActivate: [UserauthGuard] },
      {path: 'studyactive', component: ActiveStudyComponent, data: {extraParameter: 'dashboardsMenu'}, canActivate: [UserauthGuard] },
      {path: 'studycomplete', component: CompleteStudyComponent, data: {extraParameter: 'dashboardsMenu'}, canActivate: [UserauthGuard] },
      {path: 'adminnewstudy', component: AboutStudiesComponent, data: {extraParameter: 'dashboardsMenu'}, canActivate: [UserauthGuard] },
      {path: 'adminpublishstudy', component: AdminpublishstudyComponent, data: {extraParameter: 'dashboardsMenu'}, canActivate: [UserauthGuard] },
      {path: 'admincompletestudy', component: AdminCompleteStudyComponent, data: {extraParameter: 'dashboardsMenu'}, canActivate: [UserauthGuard] },
      {path: 'adminactivestudy', component: AdminActiveStudyComponent, data: {extraParameter: 'dashboardsMenu'}, canActivate: [UserauthGuard] },
      {path: 'admininactivestudylist', component: AdminInactiveStudyComponent, data: {extraParameter: 'dashboardsMenu'}, canActivate: [UserauthGuard] },
      {path: 'participantstudydetails/:id', component: StudyDetailsComponent, data: {extraParameter: 'dashboardsMenu'}, canActivate: [UserauthGuard] },
      {path: 'researcherstudydetails', component: ResearcherStudyDetailsComponent, data: {extraParameter: 'dashboardsMenu'}, canActivate: [UserauthGuard] },
      {path: 'adminstudyDetails/:id', component: AdminStudyDetailsComponent, data: {extraParameter: 'dashboardsMenu'}, canActivate: [UserauthGuard] },
      {path: 'researcherrejectedstudy', component: RejectedStudyComponent, data: {extraParameter: 'dashboardsMenu'}, canActivate: [UserauthGuard] },
      {path: 'researcherCandidateDetails', component: CandidateDetailsComponent, data: {extraParameter: 'dashboardsMenu'}, canActivate: [UserauthGuard] },
      {path: 'researcheractivestudyDetails/:id', component: ActiveStudyDetailsComponent, data: {extraParameter: 'dashboardsMenu'}, canActivate: [UserauthGuard] },
      {path: 'activecandidatelist/:id', component: ActiveCandidateInfoListComponent, data: {extraParameter: 'dashboardsMenu'}, canActivate: [UserauthGuard] },
      {path: 'completeparticipantlist/:id', component: CompleteParticipantListComponent, data: {extraParameter: 'dashboardsMenu'}, canActivate: [UserauthGuard] },
      {path: 'editpausestudy/:id', component: PauseStudyEditComponent, data: {extraParameter: 'dashboardsMenu'}, canActivate: [UserauthGuard] },
      {path: 'activestudyrecord', component: ActiveStudyReportComponent, data: {extraParameter: 'dashboardsMenu'}, canActivate: [UserauthGuard] },
      {path: 'unsuccessfulpay/:id', component: UnSuccessfulPayComponent, data: {extraParameter: 'dashboardsMenu'}, canActivate: [UserauthGuard] },

      {path: 'acceptrejectcandidatelist/:id', component: AcceptRejectStudyListComponent, data: {extraParameter: 'dashboardsMenu'}, canActivate: [UserauthGuard] },
      {path: 'candidatesubmissionlist/:id', component: StudySubmissionComponent, data: {extraParameter: 'dashboardsMenu'}, canActivate: [UserauthGuard] },
      {path: 'adminactivestudydetails/:id', component: AdminActiveStudyDetailsComponent, data: {extraParameter: 'dashboardsMenu'}, canActivate: [UserauthGuard] },
      {path: 'adminuserlist/:id', component: ActiveUserListAdminComponent, data: {extraParameter: 'dashboardsMenu'}, canActivate: [UserauthGuard] },
      {path: 'adminsubmitstudylist/:id', component: StudySubmitListAdminComponent, data: {extraParameter: 'dashboardsMenu'}, canActivate: [UserauthGuard] },
      {path: 'admincompletetudylist/:id', component: CompleteStudyDetailsAdminComponent, data: {extraParameter: 'dashboardsMenu'}, canActivate: [UserauthGuard] },
      {path: 'admininactivestudy/:id', component: InActiveStudyAdminComponent, data: {extraParameter: 'dashboardsMenu'}, canActivate: [UserauthGuard] },
      {path: 'adminwallet', component: AdminWalletComponent, data: {extraParameter: 'dashboardsMenu'}, canActivate: [UserauthGuard] },
      {path: 'adminstudypaymentlist/:id', component: StudyPaymentListComponent, data: {extraParameter: 'dashboardsMenu'}, canActivate: [UserauthGuard] },
      {path: 'participantstudysubmission/:id', component: ParticipantStudySubmissionComponent, data: {extraParameter: 'dashboardsMenu'}, canActivate: [UserauthGuard] },
      {path: 'participanttotalstudysubmission/:id', component: PartiicpantTotalSubmitComponent, data: {extraParameter: 'dashboardsMenu'}, canActivate: [UserauthGuard] },
      {path: 'participantstudyacceptreject/:id', component: PartiicpantAcceptRejectComponent, data: {extraParameter: 'dashboardsMenu'}, canActivate: [UserauthGuard] },
      {path: 'participantstudyreject/:id', component: PartiicpantRejectStudyComponent, data: {extraParameter: 'dashboardsMenu'}, canActivate: [UserauthGuard] },
      {path: 'participantstudytotalattempt/:id', component: PartiicpantTotalAttepmtComponent, data: {extraParameter: 'dashboardsMenu'}, canActivate: [UserauthGuard] },
      {path: 'researchercompleteStudyDetails/:id', component: ComplteStudyDetailsComponent, data: {extraParameter: 'dashboardsMenu'}, canActivate: [UserauthGuard] },
      {path: 'rejectedstudydetails/:id', component: RejectedStudyDetailsComponent, data: {extraParameter: 'dashboardsMenu'}, canActivate: [UserauthGuard] },
      {path: 'researcherstudyDescription/:id', component: DescriptionStudyComponent, data: {extraParameter: 'dashboardsMenu'}, canActivate: [UserauthGuard] },
      {path: 'researchertrackactivestudy', component: TrackActiveStudyComponent, data: {extraParameter: 'dashboardsMenu'}, canActivate: [UserauthGuard] },
      {path: 'trackatudydetail/:id', component: TrackStudyDetailsComponent, data: {extraParameter: 'dashboardsMenu'}, canActivate: [UserauthGuard] },
      {path: 'studysubmission/:token', component: AfterStudySubmissionComponent, data: {extraParameter: 'dashboardsMenu'} },
      {path: 'blacklist/:id', component: BlackListComponent, data: {extraParameter: 'dashboardsMenu'}, canActivate: [UserauthGuard] },
      {path: 'whitelist/:id', component: WhiteListComponent, data: {extraParameter: 'dashboardsMenu'}, canActivate: [UserauthGuard] },
      {path: 'participantratinglist/:id', component: ParticipantRatingListComponent, data: {extraParameter: 'dashboardsMenu'}, canActivate: [UserauthGuard] },
      {path: 'rangeansewerlist/:id', component: RangeAnswersListComponent, data: {extraParameter: 'dashboardsMenu'}, canActivate: [UserauthGuard] },
      {path: 'eligiblecandidates/:id', component: EligibleCndidatesListComponent, data: {extraParameter: 'dashboardsMenu'}, canActivate: [UserauthGuard] },
      {path: 'activestudydashboard/:id', component: ActiveStudyDashboardComponent, data: {extraParameter: 'dashboardsMenu'}, canActivate: [UserauthGuard] },


      // participant study

      {path: 'participantstudy', component: StudyListComponent, data: {extraParameter: 'dashboardsMenu'}, canActivate: [UserauthGuard] },
      {path: 'participanteditnewstudy/:id', component: EditNewStudyComponent, data: {extraParameter: 'dashboardsMenu'}, canActivate: [UserauthGuard] },
      {path: 'participanteditstudydescription/:id', component: EditNewStudyDEscriptionComponent, data: {extraParameter: 'dashboardsMenu'}, canActivate: [UserauthGuard] },
      {path: 'blankstudy', component: BlankStudyComponent, data: {extraParameter: 'dashboardsMenu'}, canActivate: [UserauthGuard] },



      // about you

      {path: 'aboutyou', component: AboutYouComponent, data: {extraParameter: 'elementsMenu'}, canActivate: [UserauthGuard] },
      {path: 'questions/:id', component: QuestionsComponent, data: {extraParameter: 'elementsMenu'}, canActivate: [UserauthGuard] },
      {path: 'category-questions', component: AddQuestionsComponent, data: {extraParameter: 'elementsMenu'}, canActivate: [UserauthGuard] },
      {path: 'question-categoryadmin', component: QuestionCategoryComponent , canActivate: [UserauthGuard] },
      {path: 'questionlist/:id', component: QuestionListComponent , canActivate: [UserauthGuard] },
      {path: 'answerlist/:id', component: AnswerListComponent , canActivate: [UserauthGuard] },


      // transaction

      {path: 'transactions', component: TransactionComponent, data: {extraParameter: 'dashboardsMenu'}, canActivate: [UserauthGuard] },
      {path: 'admintransactions', component: AdminTransactionComponent, data: {extraParameter: 'dashboardsMenu'}, canActivate: [UserauthGuard] },
      {path: 'participanttransactions', component: ParticipantTransctionsComponent, data: {extraParameter: 'dashboardsMenu'}, canActivate: [UserauthGuard] },



      // Message

      {path: 'newmessage', component: NewMessageComponent, data: {extraParameter: 'dashboardsMenu'}, canActivate: [UserauthGuard] },
      {path: 'inboxmessage', component: InboxComponent, data: {extraParameter: 'dashboardsMenu'}, canActivate: [UserauthGuard] },
      {path: 'archivemessage', component: ArchiveComponent, data: {extraParameter: 'dashboardsMenu'}, canActivate: [UserauthGuard] },
      {path: 'sentmessage', component: SentComponent, data: {extraParameter: 'dashboardsMenu'}, canActivate: [UserauthGuard] },
      {path: 'messagedetails/:id', component: MessageDetailsComponent, data: {extraParameter: 'dashboardsMenu'}, canActivate: [UserauthGuard] },
      {path: 'inboxmessagedetails/:id', component: InboxMessageDetailsComponent, data: {extraParameter: 'dashboardsMenu'}, canActivate: [UserauthGuard] },
      {path: 'participantnewmessage/:id', component: ParticipantNewMessageComponent, data: {extraParameter: 'dashboardsMenu'}, canActivate: [UserauthGuard] },
      {path: 'participantsent', component: ParticipantSEntComponent, data: {extraParameter: 'dashboardsMenu'}, canActivate: [UserauthGuard] },
      {path: 'participantinbox', component: ParticipantInboxComponent, data: {extraParameter: 'dashboardsMenu'}, canActivate: [UserauthGuard] },
      {path: 'participantinboxdetails/:id', component: ParticipantInboxDetailsComponent, data: {extraParameter: 'dashboardsMenu'}, canActivate: [UserauthGuard] },
      {path: 'participantsentdetails/:id', component: ParticipantsentDetailsComponent, data: {extraParameter: 'dashboardsMenu'}, canActivate: [UserauthGuard] },
      {path: 'participantcreatenewmessage', component: CreateNewMessageComponent, data: {extraParameter: 'dashboardsMenu'}, canActivate: [UserauthGuard] },
      {path: 'adminsentmessage', component: SentMessageComponent, data: {extraParameter: 'dashboardsMenu'}, canActivate: [UserauthGuard] },
      {path: 'admininboxmessage', component: InboxMessageComponent, data: {extraParameter: 'dashboardsMenu'}, canActivate: [UserauthGuard] },
      {path: 'adminnewmessage', component: AdminNewMessageComponent, data: {extraParameter: 'dashboardsMenu'}, canActivate: [UserauthGuard] },
      {path: 'admininboxdetails/:id', component: AdmininboxmessagedetailsComponent, data: {extraParameter: 'dashboardsMenu'}, canActivate: [UserauthGuard] },
      {path: 'adminsentdetails/:id', component: AdminsentmessagedetailsComponent, data: {extraParameter: 'dashboardsMenu'}, canActivate: [UserauthGuard] },
      {path: 'createnewmessageresearcher/:study_id/:id', component: CreateNewMessageResearcherComponent, data: {extraParameter: 'dashboardsMenu'}, canActivate: [UserauthGuard] },
      {path: 'participantarchivemessage', component: ParticipantarchiveComponent, data: {extraParameter: 'dashboardsMenu'}, canActivate: [UserauthGuard] },
      {path: 'participanthelpmessage', component: HelpmessageComponent, data: {extraParameter: 'dashboardsMenu'}, canActivate: [UserauthGuard] },
      {path: 'researcherhelpmessage', component: ResearcherHelpmessageComponent, data: {extraParameter: 'dashboardsMenu'}, canActivate: [UserauthGuard] },


      // Elements

      {path: 'accountparticipant', component: AccountsParticipantsComponent, data: {extraParameter: 'elementsMenu'}, canActivate: [UserauthGuard] },
      {path: 'accountresearcher', component: AccountResearcherComponent, data: {extraParameter: 'elementsMenu'}, canActivate: [UserauthGuard] },
      {path: 'editadmin', component: EditAdminComponent, data: {extraParameter: 'elementsMenu'}, canActivate: [UserauthGuard] },
      {path: 'updatepassword', component: UpdatepasswordADminComponent, data: {extraParameter: 'elementsMenu'}, canActivate: [UserauthGuard] },
      {path: 'accountadmin', component: AccountAdminComponent, data: {extraParameter: 'dashboardsMenu'}, canActivate: [UserauthGuard] },

    ]

  },
  {
    path: '',
    component: PagesLayoutComponent,
    children: [

      // User Pages

      {path: 'pages/login', component: LoginComponent, data: {extraParameter: ''}},
      {path: 'pages/login-boxed', component: LoginBoxedComponent, data: {extraParameter: ''}},
      {path: 'pages/register', component: RegisterComponent, data: {extraParameter: ''}},
      {path: 'pages/participantregister', component: RegisterBoxedComponent, data: {extraParameter: ''}},
      {path: 'pages/forgot-password', component: ForgotPasswordComponent, data: {extraParameter: ''}},
      {path: 'pages/forgot-password-boxed', component: ForgotPasswordBoxedComponent, data: {extraParameter: ''}},
      {path: 'pages/researcherregister', component: ResearcherComponent, data: {extraParameter: ''}},
      {path: 'pages/signup', component: SignUpComponent, data: {extraParameter: ''}},
      {path: 'pages/login-boxed', component: UserLoginComponent, data: {extraParameter: ''}},
      {path: 'pages/termsconditions/:user_type', component: TermsConditionsComponent, data: {extraParameter: ''} },
      {path: 'pages/privacypolcies/:user_type', component: PrvicyPoliciesComponent, data: {extraParameter: ''}},
      {path: 'pages/changepassword', component: ChangePassowrdUserComponent, data: {extraParameter: ''},canActivate: [UserauthGuard]},
      {path: 'pages/editpolicy/:id', component: EditPolicyComponent, data: {extraParameter: ''}, canActivate: [UserauthGuard] },
      {path: 'pages/editprofile', component: EditProfileComponent, data: {extraParameter: ''}, canActivate: [UserauthGuard] },
      {path: 'pages/editterms/:id', component: EditTermsComponent, data: {extraParameter: ''}, canActivate: [UserauthGuard] },
      {path: 'pages/updatepassword/:token', component: UpdatePasswordUserComponent, data: {extraParameter: ''} },
      {path: 'pages/verifyemail/:confirmation_token', component: VerifyEmailComponent, data: {extraParameter: ''}},

    ]
  },
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,
    {
      scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled',
    })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
