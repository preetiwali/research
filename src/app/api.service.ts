import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';
import {environment} from '../environments/environment';
// import { pipe } from '@angular/core/src/render3';


const endpoint = environment.baseUrl;

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Access-Control-Allow-Origin': '*'
  })
};
const httpOptionsNew = {
  headers: new HttpHeaders()
};

@Injectable({
  providedIn: 'root'
})


export class ApiService {
  constructor(private http: HttpClient) { }

  private static extractData(res: Response) {
    return res || { };
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
             return of(result as T);
    };
  }

  checkUserLogin(login): Observable<any> {
    return this.http.post<any>(endpoint + 'users/sign_in', login, httpOptions).pipe(
      tap((userdata) => console.log(`user login`)),
      catchError(this.handleError<any>('checkUserLogin'))
    );
  }

  checkforgotPassword(password): Observable<any> {
    return this.http.post<any>(endpoint + 'password/forgot', password, httpOptions).pipe(
      tap((userdata) => console.log(`user login`)),
      catchError(this.handleError<any>('checkforgotPassword'))
    );
  }

  changeLoginCount(id): Observable<any> {
    return this.http.post<any>(endpoint + 'change_login_count/' +id, httpOptions).pipe(
      tap((userdata) => console.log(`user login`)),
      catchError(this.handleError<any>('changeLoginCount'))
    );
  }


  registerUserParticipant(register): Observable<any> {
    return this.http.post<any>(endpoint + 'users', register, httpOptions).pipe(
      tap((userregister) => console.log(`added class w/ id=${userregister.id}`)),
      catchError(this.handleError<any>('registerUser'))
    );
  }

  registerUserResearcher(register): Observable<any> {
    return this.http.post<any>(endpoint + 'users', register, httpOptions).pipe(
      tap((userregister) => console.log(`added class w/ id=${userregister.id}`)),
      catchError(this.handleError<any>('registerUser'))
    );
  }

  getUserInfo(id): Observable<any> {
    return this.http.get(endpoint + 'getuserinfo/' +id).pipe(
      map(ApiService.extractData)); 
  }

  getParamsInfo(params): Observable<any> {
    return this.http.post<any>(endpoint + 'payment_confirmation', params, httpOptions).pipe(
      map(ApiService.extractData),
      // catchError(this.handleError<any>('checkUserLogin'))
    );
  }

  // getPaymentParamsInfo(params): Observable<any> {
  //   return this.http.post<any>(endpoint + 'payment_response', params, httpOptions).pipe(
  //     map(ApiService.extractData),
  //     // catchError(this.handleError<any>('checkUserLogin'))
  //   );
  // }

  getAllCategory(): Observable<any> {
    return this.http.get(endpoint + 'question_categories').pipe(
      map(ApiService.extractData)); 
  }

  getAudienceCategory(study_id): Observable<any> {
    return this.http.get(endpoint + 'audience_question_category/' +study_id).pipe(
      map(ApiService.extractData)); 
  }

  getCategoryUser(): Observable<any> {
    return this.http.get(endpoint + 'about_you').pipe(
      map(ApiService.extractData)); 
  }

  getAllParticipantQuestions(id): Observable<any> {
    return this.http.get(endpoint + 'category_question/' + id).pipe(
      map(ApiService.extractData)); 
  }

  getAllQuestions(id,study_id): Observable<any> {
    return this.http.get(endpoint + 'audience_question/' + id + "/" + study_id).pipe(
      map(ApiService.extractData)); 
  }

  getAllUserTerms(): Observable<any> {
    return this.http.get(endpoint + 'user_terms').pipe(
      map(ApiService.extractData)); 
  }

  getAllUserPolicy(): Observable<any> {
    return this.http.get(endpoint + 'user_policies').pipe(
      map(ApiService.extractData)); 
  }

  getAllQuestionsList(id): Observable<any> {
    return this.http.get(endpoint + 'question_list/' +id).pipe(
      map(ApiService.extractData)); 
  }

  getAllAnswersList(id): Observable<any> {
    return this.http.get(endpoint + 'question_answer/' +id).pipe(
      map(ApiService.extractData)); 
  }

  getAllPolicy(user_type): Observable<any> {
    return this.http.get(endpoint + 'privacy_policies?user_type=' +user_type).pipe(
      map(ApiService.extractData)); 
  }
  
  getAllTerms(user_type): Observable<any> {
    return this.http.get(endpoint + 'terms_and_conditions?user_type=' + user_type).pipe(
      map(ApiService.extractData)); 
  }


  getAdminTerms(): Observable<any> {
    return this.http.get(endpoint + 'terms_and_conditions' ).pipe(
      map(ApiService.extractData)); 
  }

  getAdminPolicy(): Observable<any> {
    return this.http.get(endpoint + 'privacy_policies').pipe(
      map(ApiService.extractData)); 
  }

  deleteTermConditions(id): Observable<any> {
    return this.http.delete<any>(endpoint + 'terms_and_conditions/' + id, httpOptions).pipe(
      catchError(this.handleError<any>('deleteTermConditions'))
    );
  } 

  deletePrivacyPolicy(id): Observable<any> {
    return this.http.delete<any>(endpoint + 'privacy_policies/' + id, httpOptions).pipe(
      catchError(this.handleError<any>('deletePrivacyPolicy'))
    );
  }

  changeUserPass(info): Observable<any> {
    return this.http.post<any>(endpoint + 'password/reset' , info, httpOptions).pipe(
      tap((chnageUserPassword) => console.log(`added class w/ id=${chnageUserPassword.id}`)),
      catchError(this.handleError<any>('chnageuserpassword'))
    );
  }

  changeUserPassword(info): Observable<any> {
    return this.http.post<any>(endpoint + 'password/change', info, httpOptions).pipe(
      tap((chnageUserPassword) => console.log(`added class w/ id=${chnageUserPassword.id}`)),
      catchError(this.handleError<any>('chnageuserpassword'))
    );
  }

  getToken(confirmation_token): Observable<any> {
    return this.http.get(endpoint + 'welcome/' +confirmation_token).pipe(
      map(ApiService.extractData)); 
  }

  getAllParticipantUsers(id): Observable<any> {
    return this.http.get(endpoint + 'getuserinfo/'+id).pipe(
      map(ApiService.extractData));
  }

  getAllResearcherUsers(id): Observable<any> {
    return this.http.get(endpoint + 'getuserinfo/'+id).pipe(
      map(ApiService.extractData));
  }

  getAllParticipant(): Observable<any> {
    return this.http.get(endpoint + 'participantlist').pipe(
      map(ApiService.extractData));
  }

  getAllResearche(): Observable<any> {
    return this.http.get(endpoint + 'researcherlist').pipe(
      map(ApiService.extractData));
  }


  getAllgetUnpublishedStudy(user_id): Observable<any> {
    return this.http.get(endpoint + 'unpublished_studies/' +user_id).pipe(
      map(ApiService.extractData));
  }

  getAllActiveStudy(user_id): Observable<any> {
    return this.http.get(endpoint + 'active_studies/' +user_id).pipe(
      map(ApiService.extractData));
  }

  updateActiveStatus(id): Observable<any> {
    return this.http.put<any>(endpoint + 'activateuser/' + id, httpOptions).pipe(
      tap((useractiveStatus) => console.log(`added class w/ id=${useractiveStatus.id}`)),
      catchError(this.handleError<any>('useractivestatus'))
    );
  }

  updateDeactiveStatus(id): Observable<any> {
    return this.http.put<any>(endpoint + 'deactivateuser/' + id, httpOptions).pipe(
      tap((useractiveStatus) => console.log(`added class w/ id=${useractiveStatus.id}`)),
      catchError(this.handleError<any>('deactiveStatus'))
    );
  }

  updateTerms(info, id): Observable<any> {
    return this.http.put<any>(endpoint + 'terms_and_conditions/' + id , info, httpOptions).pipe(
      catchError(this.handleError<any>('updateTerms'))
    );
  }

  getTerms(id): Observable<any> {
    return this.http.get(endpoint + 'terms_and_conditions/' +id).pipe(
      map(ApiService.extractData)); 
  }

  updatePolicy(info, id): Observable<any> {
    return this.http.put<any>(endpoint + 'privacy_policies/' + id , info, httpOptions).pipe(
      catchError(this.handleError<any>('updatePolicy'))
    );
  }

  updateCategory(info, id): Observable<any> {
    return this.http.put<any>(endpoint + 'question_categories/' + id , info, httpOptions).pipe(
      catchError(this.handleError<any>('updateCategory'))
    );
  }


  orderFAQ(info, id): Observable<any> {
    return this.http.put<any>(endpoint + 'faq_help_questions/' + id , info, httpOptions).pipe(
      catchError(this.handleError<any>('orderFAQ'))
    );
  }


  orderResearcherFAQ(info, id): Observable<any> {
    return this.http.put<any>(endpoint + 'faq_help_questions/' + id , info, httpOptions).pipe(
      catchError(this.handleError<any>('orderResearcherFAQ'))
    );
  }


  updateQuestion(info, id): Observable<any> {
    return this.http.put<any>(endpoint + 'questions/' + id , info, httpOptions).pipe(
      catchError(this.handleError<any>('updateQuestion'))
    );
  }

  editAnswer(info, id): Observable<any> {
    return this.http.put<any>(endpoint + 'answers/' + id , info, httpOptions).pipe(
      catchError(this.handleError<any>('editAnswer'))
    );
  }

  updateProfile(info, id): Observable<any> {
    return this.http.put<any>(endpoint + 'updateuserinfo/' + id , info, httpOptions).pipe(
      catchError(this.handleError<any>('updateProfile'))
    );
  }

  editStudy(info, id): Observable<any> {
    return this.http.put<any>(endpoint + 'studies/' + id , info, httpOptions).pipe(
      catchError(this.handleError<any>('editStudy'))
    );
  } 

  getPolicy(id): Observable<any> {
    return this.http.get(endpoint + 'privacy_policies/' +id).pipe(
      map(ApiService.extractData)); 
  }

  getInfoUser(id): Observable<any> {
    return this.http.get(endpoint + 'getuserinfo/' +id).pipe(
      map(ApiService.extractData)); 
  }

  getStudyInfo(id): Observable<any> {
    return this.http.get(endpoint + 'studies/' +id).pipe(
      map(ApiService.extractData)); 
  }

  getCompletedStudy(id): Observable<any> {
    return this.http.get(endpoint + 'completed_studies/' +id).pipe(
      map(ApiService.extractData)); 
  }

  getAdminstudyInfo(id): Observable<any> {
    return this.http.get(endpoint + 'admin_active_study_detail/' +id).pipe(
      map(ApiService.extractData)); 
  }

  addQuestions(addquestion): Observable<any> {
    return this.http.post<any>(endpoint + 'questions', addquestion, httpOptions).pipe(
      tap((addQuestions) => console.log(`added class w/ id=${addQuestions.id}`)),
      catchError(this.handleError<any>('addQuestions'))
    );
  }

  addAnswer(addanswer): Observable<any> {
    return this.http.post<any>(endpoint + 'answers', addanswer, httpOptions).pipe(
      tap((addanswer) => console.log(`added class w/ id=${addanswer.id}`)),
      catchError(this.handleError<any>('addAnswer'))
    );
  }

  saveAnswer(addquestion): Observable<any> {
    return this.http.post<any>(endpoint + 'responses', addquestion, httpOptions).pipe(
      tap((saveAnswer) => console.log(`added class w/ id=${saveAnswer.id}`)),
      catchError(this.handleError<any>('saveAnswer'))
    );
  }

  saveAudienceAnswer(addanswer): Observable<any> {
    return this.http.post<any>(endpoint + 'audiences', addanswer, httpOptions).pipe(
      tap((saveAudienceAnswer) => console.log(`added class w/ id=${saveAudienceAnswer.id}`)),
      catchError(this.handleError<any>('saveAudienceAnswer'))
    );
  }


  newStudy(addnewstudy): Observable<any> {
    return this.http.post<any>(endpoint + 'studies', addnewstudy, httpOptions).pipe(
      tap((newStudy) => console.log(`added class w/ id=${newStudy.id}`)),
      catchError(this.handleError<any>('newStudy'))
    );
  }

  studyDescription(adddescription): Observable<any> {
    return this.http.post<any>(endpoint + 'add_description', adddescription, httpOptions).pipe(
      tap((studyDescription) => console.log(`added class w/ id=${studyDescription.id}`)),
      catchError(this.handleError<any>('studyDescription'))
    );
  }


  deleteQuestion(id): Observable<any> {
    return this.http.post<any>(endpoint + 'delete_question/' + id, httpOptions).pipe(
      catchError(this.handleError<any>('deleteQuestion'))
    );
  }

  deleteCategory(id): Observable<any> {
    return this.http.delete<any>(endpoint + 'delete_question_category/' + id, httpOptions).pipe(
      catchError(this.handleError<any>('deleteCategory'))
    );
  }

  deleteResponse(id): Observable<any> {
    return this.http.delete<any>(endpoint + 'delete_response/' +id , httpOptions).pipe(
      catchError(this.handleError<any>('deleteResponse'))
    );
  }

  deleteAnswer(id): Observable<any> {
    return this.http.delete<any>(endpoint + 'answers/' + id, httpOptions).pipe(
      catchError(this.handleError<any>('deleteAnswer'))
    );
  }

  deleteStudy(id): Observable<any> {
    return this.http.delete<any>(endpoint + 'studies/' + id, httpOptions).pipe(
      catchError(this.handleError<any>('deletStudy'))
    );
  }

  completeStudy(id): Observable<any> {
    return this.http.put<any>(endpoint + 'complete_study/' + id, httpOptions).pipe(
      catchError(this.handleError<any>('completeStudy'))
    );
  }


  toStopStudy(id): Observable<any> {
    return this.http.post<any>(endpoint + 'stop_study/' +id , httpOptions).pipe(
      tap((toStopStudy) => console.log(`added class w/ id=${toStopStudy.id}`)),
      catchError(this.handleError<any>('toStopStudy'))
    );
  }

  confirmStudy(id): Observable<any> {
    return this.http.put<any>(endpoint + 'publish_study/' + id, httpOptions).pipe(
      tap((confirmStudy) => console.log(`added class w/ id=${confirmStudy.id}`)),
      catchError(this.handleError<any>('confirmStudy'))
    );
  }

  getResearcherInfo(id): Observable<any> {
    return this.http.get(endpoint + 'researcheroverview/' +id).pipe(
      map(ApiService.extractData)); 
  }

  getParticipantInfo(id): Observable<any> {
    return this.http.get(endpoint + 'participantoverview/' +id).pipe(
      map(ApiService.extractData)); 
  }

  getTermsOfUse(): Observable<any> {
    return this.http.get(endpoint + 'terms_of_uses').pipe(
      map(ApiService.extractData)); 
  }

  editTermsOfUse(info, id): Observable<any> {
    return this.http.put<any>(endpoint + 'terms_of_uses/' + id , info, httpOptions).pipe(
      catchError(this.handleError<any>('editTermsOfUse'))
    );
  }

  addTermsOfUse(addtermsofuse): Observable<any> {
    return this.http.post<any>(endpoint + 'terms_of_uses', addtermsofuse, httpOptions).pipe(
      tap((addtermsofuse) => console.log(`added class w/ id=${addtermsofuse.id}`)),
      catchError(this.handleError<any>('addTermsOfUse'))
    );
  }

  getTermsOfUseInfo(): Observable<any> {
    return this.http.get(endpoint + 'terms_of_uses').pipe(
      map(ApiService.extractData)); 
  }

  addCategory(addquestion): Observable<any> {
    return this.http.post<any>(endpoint + 'question_categories', addquestion, httpOptions).pipe(
      tap((addQuestions) => console.log(`added class w/ id=${addQuestions.id}`)),
      catchError(this.handleError<any>('addCategory'))
    );
  }

  getReports(): Observable<any> {
    return this.http.get(endpoint + 'reports' ).pipe(
      map(ApiService.extractData)); 
  }

  getAdminStudyInfo(): Observable<any> {
    return this.http.get(endpoint + 'admin_new_study_list/').pipe(
      map(ApiService.extractData)); 
  }

  acceptStudy(id): Observable<any> {
    return this.http.post<any>(endpoint + 'activate_study/' + id, httpOptions).pipe(
      catchError(this.handleError<any>('acceptStudy'))
    );
  }

  rejectStudy(info,id): Observable<any> {
    return this.http.post<any>(endpoint + 'reject_study/' +id , info, httpOptions).pipe(
      catchError(this.handleError<any>('rejectStudy'))
    );
  }

  getAdminCompleteStudyInfo(): Observable<any> {
    return this.http.get(endpoint + 'admin_complete_study_list/').pipe(
      map(ApiService.extractData)); 
  }

  getAdminActiveStudyInfo(): Observable<any> {
    return this.http.get(endpoint + 'admin_active_study_list/').pipe(
      map(ApiService.extractData)); 
  }

  getAdminInActiveStudyInfo(): Observable<any> {
    return this.http.get(endpoint + 'admin_inactive_study_list/').pipe(
      map(ApiService.extractData)); 
  }

  getAdminInactiveStudyDetail(id): Observable<any> {
    return this.http.get(endpoint + 'study_detail/'+id).pipe(
      map(ApiService.extractData)); 
  }

  DeactivateStudy(info , id): Observable<any> {
    return this.http.post<any>(endpoint + 'reject_study/' +id , info , httpOptions).pipe(
      catchError(this.handleError<any>('DeactivateStudy'))
    );
  }

  readNotification(id): Observable<any> {
    return this.http.get(endpoint + 'change_status/' +id ).pipe(
      map(ApiService.extractData)); 
  }

  seennotification(id): Observable<any> {
    return this.http.get(endpoint + 'change_seen_status/' +id ).pipe(
      map(ApiService.extractData)); 
  }

  getAdminStudyDetail(id): Observable<any> {
    return this.http.get(endpoint + 'study_detail/' +id ).pipe(
      map(ApiService.extractData)); 
  }
  
  getRejectedStudy(id): Observable<any> {
    return this.http.get(endpoint + 'rejected_studies/' +id ).pipe(
      map(ApiService.extractData)); 
  }

  getParticipantStudyInfo(id): Observable<any> {
    return this.http.get(endpoint + 'participant_active_study_list/' +id ).pipe(
      map(ApiService.extractData)); 
  }

  getParticipantStudyDetail(id): Observable<any> {
    return this.http.get(endpoint + 'participant_active_study_detail/' +id ).pipe(
      map(ApiService.extractData)); 
  }

  attemptStudy(id): Observable<any> {
    return this.http.get(endpoint + 'attempt_study/' +id ).pipe(
      map(ApiService.extractData)); 
  }

  submitStudy(id): Observable<any> {
    return this.http.get(endpoint + 'submit_study/' +id ).pipe(
      map(ApiService.extractData)); 
  }

  getResearcherStudyInfo(id): Observable<any> {
    return this.http.get(endpoint + 'researcher_active_study_detail/' +id ).pipe(
      map(ApiService.extractData)); 
  }

  acceptSubmittedStudy(study_id,id): Observable<any> {
    return this.http.get<any>(endpoint + 'accept_study_submission/' + study_id + "/" +id, httpOptions).pipe(
      catchError(this.handleError<any>('acceptSubmittedStudy'))
    );
  } 

  rejectSubmitStudy(info ,study_id,id): Observable<any> {
    return this.http.post<any>(endpoint + 'reject_study_submission/' + study_id + "/" +id , info, httpOptions).pipe(
      catchError(this.handleError<any>('rejectSubmitStudy'))
    );
  }

  getCandidateInfo(id): Observable<any> {
    return this.http.get(endpoint + 'active_candidate_list/' +id ).pipe(
      map(ApiService.extractData)); 
  }

  getSubmittedCandidateInfo(id): Observable<any> {
    return this.http.get(endpoint + 'submitted_candidate_list/' +id ).pipe(
      map(ApiService.extractData)); 
  }

  getAcceptCandidateInfo(id): Observable<any> {
    return this.http.get(endpoint + 'accepted_candidate_list/' +id ).pipe(
      map(ApiService.extractData)); 
  }
  
  deleteResearcherResponse(study_id,id): Observable<any> {
    return this.http.put<any>(endpoint + 'delete_audience/' +study_id+ "/" + id, httpOptions).pipe(
      catchError(this.handleError<any>('deleteResearcherResponse'))
    );
  }

  studyPayement(id,response): Observable<any> {
    return this.http.put<any>(endpoint + 'pay_for_study/' + id, response, httpOptions).pipe(
      tap((studyPayement) => console.log(`added class w/ id=${studyPayement.id}`)),
      catchError(this.handleError<any>('studyPayement'))
    );
  }

  studyPayementParticipant(response): Observable<any> {
    return this.http.put<any>(endpoint + 'cash_out' , response, httpOptions).pipe(
      tap((studyPayementParticipant) => console.log(`added class w/ id=${studyPayementParticipant.id}`)),
      catchError(this.handleError<any>('studyPayementParticipant'))
    );
  }

  getStudyPaymentInfo(id): Observable<any> {
    return this.http.get(endpoint + 'paid_candidate_list/' +id ).pipe(
      map(ApiService.extractData)); 
  }

  // deleteAccountParticipant(id): Observable<any> {
  //   return this.http.delete<any>(endpoint + 'deleteuser/' + id, httpOptions).pipe(
  //     catchError(this.handleError<any>('deleteAccountParticipant'))
  //   );
  // }

  deleteAccountParticipant(id): Observable<any> {
    return this.http.put<any>(endpoint + 'deactivate_account/' +id, httpOptions).pipe(
      tap((deleteAccountParticipant) => console.log(`added class w/ id=${deleteAccountParticipant.id}`)),
      catchError(this.handleError<any>('deleteAccountParticipant'))
    );
  }

  deleteAccountResearcher(id): Observable<any> {
    return this.http.put<any>(endpoint + 'deactivate_account/' +id, httpOptions).pipe(
      tap((deleteAccountResearcher) => console.log(`added class w/ id=${deleteAccountResearcher.id}`)),
      catchError(this.handleError<any>('deleteAccountResearcher'))
    );
  }

  
  getparticipantSubmissionInfo(id): Observable<any> {
    return this.http.get(endpoint + 'participant_study_submission/' +id ).pipe(
      map(ApiService.extractData)); 
  }

  getTotalSubmissionInfo(id): Observable<any> {
    return this.http.get(endpoint + 'total_submission_list/' +id ).pipe(
      map(ApiService.extractData)); 
  }

  getTotalAttemptInfo(id): Observable<any> {
    return this.http.get(endpoint + 'total_attempt_list/' +id ).pipe(
      map(ApiService.extractData)); 
  }

  getRejectStudyInfo(id): Observable<any> {
    return this.http.get(endpoint + 'rejected_study_list/' +id ).pipe(
      map(ApiService.extractData)); 
  }

  getAcceptStudyInfo(id): Observable<any> {
    return this.http.get(endpoint + 'accepted_study_list/' +id ).pipe(
      map(ApiService.extractData)); 
  }

  newMessage(info): Observable<any> {
    return this.http.post<any>(endpoint + 'messages',info, httpOptions).pipe(
      tap((newMessage) => console.log(`added class w/ id=${newMessage.id}`)),
      catchError(this.handleError<any>('newMessage'))
    );
  }

  CheckPassword(info): Observable<any> {
    return this.http.post<any>(endpoint + 'check_password' , info, httpOptions).pipe(
      tap((CheckPassword) => console.log(`added class w/ id=${CheckPassword.id}`)),
      catchError(this.handleError<any>('CheckPassword'))
    );
  }

  getCompletedStudyDetail(id): Observable<any> {
    return this.http.get(endpoint + 'study_detail/'+id).pipe(
      map(ApiService.extractData)); 
  }

  sentMessage(id): Observable<any> {
    return this.http.get(endpoint + 'sent_mails/'+id).pipe(
      map(ApiService.extractData)); 
  }

  inboxMessage(id): Observable<any> {
    return this.http.get(endpoint + 'recieved_mails/'+id).pipe(
      map(ApiService.extractData)); 
  }

  deleteMail(id): Observable<any> {
    return this.http.delete<any>(endpoint + 'delete_message/' + id, httpOptions).pipe(
      catchError(this.handleError<any>('deleteMail'))
    );
  }

  detailedMessage(id): Observable<any> {
    return this.http.get(endpoint + 'messages/'+id).pipe(
      map(ApiService.extractData)); 
  }

  replyMessage(info): Observable<any> {
    return this.http.post<any>(endpoint + 'reject_study' ,info, httpOptions).pipe(
      catchError(this.handleError<any>('replyMessage'))
    );
  }

  archiveMail(id): Observable<any> {
    return this.http.put<any>(endpoint + 'archive_message/' +id ,httpOptions).pipe(
      catchError(this.handleError<any>('archiveMail'))
    );
  }

  archiveMessage(id): Observable<any> {
    return this.http.get(endpoint + 'archive_mails/'+id).pipe(
      map(ApiService.extractData)); 
  }

 
  deleteArchiveMail(id): Observable<any> {
    return this.http.delete<any>(endpoint + 'delete_message/' + id, httpOptions).pipe(
      catchError(this.handleError<any>('deleteArchiveMail'))
    );
  }

  researchId(id): Observable<any> {
    return this.http.get(endpoint + 'researcher_unique_id/'+id).pipe(
      map(ApiService.extractData)); 
  }

  getTrackActiveStudy(): Observable<any> {
    return this.http.get(endpoint + 'track_active_study_list').pipe(
      map(ApiService.extractData)); 
  }

  seenStudy(study_id): Observable<any> {
    return this.http.get(endpoint + 'seen_study/' + study_id).pipe(
      map(ApiService.extractData)); 
  }

  republishStudy(study_id): Observable<any> {
    return this.http.get(endpoint + 'republish/' + study_id).pipe(
      map(ApiService.extractData)); 
  }

  getcompletionCode(): Observable<any> {
    return this.http.get(endpoint + 'new_study').pipe(
      map(ApiService.extractData)); 
  }
  
  referInfo(info): Observable<any> {
    return this.http.post<any>(endpoint + 'share_referral_code' ,info, httpOptions).pipe(
      catchError(this.handleError<any>('referInfo'))
    );
  }

  studySubmitted(info): Observable<any> {
    return this.http.post<any>(endpoint + 'submit_study' ,info, httpOptions).pipe(
      catchError(this.handleError<any>('studySubmitted'))
    );
  }

  blackList(info): Observable<any> {
    return this.http.post<any>(endpoint + 'blacklist_users' ,info, httpOptions).pipe(
      catchError(this.handleError<any>('blackList'))
    );
  }

  whiteList(info): Observable<any> {
    return this.http.post<any>(endpoint + 'whitelist_users' ,info, httpOptions).pipe(
      catchError(this.handleError<any>('whiteList'))
    );
  }

  getblackList(study_id): Observable<any> {
    return this.http.get(endpoint + 'blacklisted_users/' + study_id).pipe(
      map(ApiService.extractData)); 
  }

  getwhiteList(study_id): Observable<any> {
    return this.http.get(endpoint + 'whitelisted_users/' + study_id).pipe(
      map(ApiService.extractData)); 
  }

  acceptBlackListUser(id,study_id): Observable<any> {
    return this.http.get<any>(endpoint + 'whitelist_blacklisted_user/' + id + "/" + study_id, httpOptions).pipe(
      map(ApiService.extractData));
  }

  rejectBlackListUser(id,study_id): Observable<any> {
    return this.http.get(endpoint + 'delete_blacklisted_user/' + id + "/" + study_id, httpOptions).pipe(
      map(ApiService.extractData)); 
  }

  acceptWhiteListUser(id,study_id): Observable<any> {
    return this.http.get<any>(endpoint + 'blacklist_whitelisted_user/' + id + "/" + study_id, httpOptions).pipe(
      map(ApiService.extractData));
  }

  rejectWhiteListUser(id,study_id): Observable<any> {
    return this.http.get(endpoint + 'delete_whitelisted_user/' + id + "/" + study_id, httpOptions).pipe(
      map(ApiService.extractData)); 
  }

  whitelistedUserSelect(study_id): Observable<any> {
    return this.http.get<any>(endpoint + 'select_only_whitelisted/' + study_id, httpOptions).pipe(
      map(ApiService.extractData));
  }

  whitelistedUserNotSelect(study_id): Observable<any> {
    return this.http.get<any>(endpoint + 'reject_only_whitelisted/' + study_id, httpOptions).pipe(
      map(ApiService.extractData));
  }

  getTransactionDetails(): Observable<any> {
    return this.http.get<any>(endpoint + 'researcher_transaction' , httpOptions).pipe(
      map(ApiService.extractData));
  }

  getAdminTransactionDetails(): Observable<any> {
    return this.http.get<any>(endpoint + 'study_transaction' , httpOptions).pipe(
      map(ApiService.extractData));
  }

  getParticipantTransactionDetails(): Observable<any> {
    return this.http.get<any>(endpoint + 'participant_transaction' , httpOptions).pipe(
      map(ApiService.extractData));
  }


  updateProfileImage(info,id): Observable<any> {
    return this.http.put<any>(endpoint + 'update_image/' +id, info, httpOptionsNew).pipe(
      tap((updateProfileImage) => console.log(`added class w/ id=${updateProfileImage.id}`)),
      catchError(this.handleError<any>('updateProfileImage'))
    );
  }


  updateQuestionImage(info, id): Observable<any> {
    return this.http.post<any>(endpoint + 'questions/update_image/' +id ,info, httpOptions).pipe(
      catchError(this.handleError<any>('updateQuestionImage'))
    );
  }

  updateImage(info,id): Observable<any> {
    return this.http.put<any>(endpoint + 'update_category_image/' +id, info, httpOptionsNew).pipe(
      tap((updateImage) => console.log(`added class w/ id=${updateImage.id}`)),
      catchError(this.handleError<any>('updateImage'))
    );
  }

  emailValidate(info): Observable<any> {
    return this.http.post<any>(endpoint + 'check_email' ,info, httpOptions).pipe(
      catchError(this.handleError<any>('emailValidate'))
    );
  }

  countWords(info): Observable<any> {
    return this.http.post<any>(endpoint + 'count_description_words' ,info, httpOptions).pipe(
      catchError(this.handleError<any>('countWords'))
    );
  }

  getParticipantRatingList(study_id): Observable<any> {
    return this.http.get<any>(endpoint + 'participant_ratings/' +study_id ,httpOptions).pipe(
      map(ApiService.extractData));
  }

  editRangeAnswer(info, id): Observable<any> {
    return this.http.put<any>(endpoint + 'update_range_answer/' + id , info, httpOptions).pipe(
      catchError(this.handleError<any>('editRangeAnswer'))
    );
  }

  getFrontPage(user_id): Observable<any> {
    return this.http.get<any>(endpoint + 'front_page/' + user_id ,httpOptions).pipe(
      map(ApiService.extractData));
  }

  addTerms(addTerms): Observable<any> {
    return this.http.post<any>(endpoint + 'terms_and_conditions', addTerms, httpOptions).pipe(
      tap((addTerms) => console.log(`added class w/ id=${addTerms.id}`)),
      catchError(this.handleError<any>('addTerms'))
    );
  }

  addPolicy(addPolicy): Observable<any> {
    return this.http.post<any>(endpoint + 'privacy_policies', addPolicy, httpOptions).pipe(
      tap((addPolicy) => console.log(`added class w/ id=${addPolicy.id}`)),
      catchError(this.handleError<any>('addPolicy'))
    );
  }

  addHelpQuestion(addHelpQuestion): Observable<any> {
    return this.http.post<any>(endpoint + 'faq_help_questions', addHelpQuestion, httpOptions).pipe(
      tap((addHelpQuestion) => console.log(`added class w/ id=${addHelpQuestion.id}`)),
      catchError(this.handleError<any>('addHelpQuestion'))
    );
  }

  getParticipantHelpFAQ(): Observable<any> {
    return this.http.get<any>(endpoint + 'participant_faq' ,httpOptions).pipe(
      map(ApiService.extractData));
  }

  getResearcherHelpFAQ(): Observable<any> {
    return this.http.get<any>(endpoint + 'researcher_faq' ,httpOptions).pipe(
      map(ApiService.extractData));
  }

  updateFaqImage(info,id): Observable<any> {
    return this.http.put<any>(endpoint + 'faq_help_questions/update_image/' +id, info, httpOptionsNew).pipe(
      tap((updateFaqImage) => console.log(`added class w/ id=${updateFaqImage.id}`)),
      catchError(this.handleError<any>('updateFaqImage'))
    );
  }

  updateResearcherFaqImage(info,id): Observable<any> {
    return this.http.put<any>(endpoint + 'faq_help_questions/update_image/' +id, info, httpOptionsNew).pipe(
      tap((updateResearcherFaqImage) => console.log(`added class w/ id=${updateResearcherFaqImage.id}`)),
      catchError(this.handleError<any>('updateResearcherFaqImage'))
    );
  }

  deleteParticipantFAQImage(id): Observable<any> {
    return this.http.delete<any>(endpoint + 'faq_help_questions/delete_image/' + id, httpOptions).pipe(
      catchError(this.handleError<any>('deleteParticipantFAQImage'))
    );
  }

  deleteFAQImage(id): Observable<any> {
    return this.http.delete<any>(endpoint + 'faq_help_questions/delete_image/' + id, httpOptions).pipe(
      catchError(this.handleError<any>('deleteFAQImage'))
    );
  }

  deleteFAQQuestions(id): Observable<any> {
    return this.http.delete<any>(endpoint + 'faq_help_questions/' + id, httpOptions).pipe(
      catchError(this.handleError<any>('deleteFAQQuestions'))
    );
  }

  editHelpQuestion(info, id): Observable<any> {
    return this.http.put<any>(endpoint + 'faq_help_questions/' + id , info, httpOptions).pipe(
      catchError(this.handleError<any>('editHelpQuestion'))
    );
  }

  whiteListNewUser(user_id,study_id): Observable<any> {
    return this.http.put<any>(endpoint + 'whitelist_new_user/' + user_id + "/" + study_id, httpOptions).pipe(
      catchError(this.handleError<any>('whiteListNewUser'))
    );
  }

  copyStudy(study_id): Observable<any> {
    return this.http.put<any>(endpoint + 'duplicate_study/' + study_id, httpOptions).pipe(
      catchError(this.handleError<any>('copyStudy'))
    );
  }

  pauseStudy(study_id): Observable<any> {
    return this.http.put<any>(endpoint + 'pause_study/' + study_id, httpOptions).pipe(
      catchError(this.handleError<any>('pauseStudy'))
    );
  }

  validatePassword(info): Observable<any> {
    return this.http.post<any>(endpoint + 'validate_password' ,info, httpOptions).pipe(
      catchError(this.handleError<any>('validatePassword'))
    );
  }

  validateConfirmPassword(info): Observable<any> {
    return this.http.post<any>(endpoint + 'validate_password' ,info, httpOptions).pipe(
      catchError(this.handleError<any>('validateConfirmPassword'))
    );
  }

  resumeStudy(study_id): Observable<any> {
    return this.http.put<any>(endpoint + 'resume_study/' + study_id, httpOptions).pipe(
      catchError(this.handleError<any>('resumeStudy'))
    );
  }

  participantrating(study_id,info): Observable<any> {
    console.log(info);
    return this.http.put<any>(endpoint + 'rating_selection/' + study_id,info, httpOptions).pipe(
      catchError(this.handleError<any>('participantrating'))
    );
  }

  studyparticipated(study_id,info): Observable<any> {
    return this.http.put<any>(endpoint + 'participation_selection/' + study_id, info,httpOptions).pipe(
      catchError(this.handleError<any>('studyparticipated'))
    );
  }

  adminFilter(info): Observable<any> {
    return this.http.put<any>(endpoint + 'admin_advance_filter', info , httpOptions).pipe(
      tap((adminFilter) => console.log(`added class w/ id=${adminFilter.id}`)),
      catchError(this.handleError<any>('adminFilter'))
    );
  }

  addBasicDetails(content): Observable<any> {
    return this.http.post<any>(endpoint + 'page_contents', content, httpOptions).pipe(
      tap((addBasicDetails) => console.log(`added class w/ id=${addBasicDetails.id}`)),
      catchError(this.handleError<any>('addBasicDetails'))
    );
  }

  updatefirstpageImage(info,id): Observable<any> {
    return this.http.put<any>(endpoint + 'update_page_content_image/' +id, info, httpOptionsNew).pipe(
      tap((updatefirstpageImage) => console.log(`added class w/ id=${updatefirstpageImage.id}`)),
      catchError(this.handleError<any>('updatefirstpageImage'))
    );
  }

  getContent(id): Observable<any> {
    return this.http.get<any>(endpoint + 'show_content/' +id ,httpOptions).pipe(
      map(ApiService.extractData));
  }

  getImages(id): Observable<any> {
    return this.http.get<any>(endpoint + 'pages/' +id ,httpOptions).pipe(
      map(ApiService.extractData));
  }

  editContent(id,info): Observable<any> {
    return this.http.put<any>(endpoint + 'page_contents/' +id ,info, httpOptionsNew).pipe(
      tap((editContent) => console.log(`added class w/ id=${editContent.id}`)),
      catchError(this.handleError<any>('editContent'))
    );
  }

  deleteContentInfo(id): Observable<any> {
    return this.http.delete<any>(endpoint + 'page_contents/' + id, httpOptions).pipe(
      catchError(this.handleError<any>('deleteContentInfo'))
    );
  }

  addPageType(addpage): Observable<any> {
    return this.http.post<any>(endpoint + 'pages', addpage, httpOptions).pipe(
      tap((addPageType) => console.log(`added class w/ id=${addPageType.id}`)),
      catchError(this.handleError<any>('addPageType'))
    );
  }

  getPagesList(): Observable<any> {
    return this.http.get<any>(endpoint + 'pages' ,httpOptions).pipe(
      map(ApiService.extractData));
  }

  editPage(id,info): Observable<any> {
    return this.http.put<any>(endpoint + 'pages/' +id ,info, httpOptionsNew).pipe(
      tap((editPage) => console.log(`added class w/ id=${editPage.id}`)),
      catchError(this.handleError<any>('editPage'))
    );
  }

  deletePageType(id): Observable<any> {
    return this.http.delete<any>(endpoint + 'pages/' + id, httpOptions).pipe(
      catchError(this.handleError<any>('deletePageType'))
    );
  }

  getStudyDetails(id): Observable<any> {
    return this.http.get<any>(endpoint + 'track_active_study/' + id ,httpOptions).pipe(
      map(ApiService.extractData));
  }

  addContentDetails(addpagecontents): Observable<any> {
    return this.http.post<any>(endpoint + 'page_contents', addpagecontents, httpOptions).pipe(
      tap((addContentDetails) => console.log(`added class w/ id=${addContentDetails.id}`)),
      catchError(this.handleError<any>('addContentDetails'))
    );
  }

  SendMailToParticipant(study_id,info): Observable<any> {
    console.log(info);
      return this.http.post<any>(endpoint + 'reinvite_non_attempted/' +study_id ,info , httpOptionsNew).pipe(
        tap((SendMailToParticipants) => console.log(`added class w/ id=${SendMailToParticipants.id}`)),
        catchError(this.handleError<any>('SendMailToParticipants'))
      );
  }

  getParticipantExprienceList(): Observable<any> {
    return this.http.get<any>(endpoint + 'participant_experience',httpOptions).pipe(
      map(ApiService.extractData));
  }

  getEligibleCandidate(study_id): Observable<any> {
    return this.http.get<any>(endpoint + 'active_study_candidates/' + study_id,httpOptions).pipe(
      map(ApiService.extractData));
  }

  getvisitedStudy(study_id): Observable<any> {
    return this.http.get<any>(endpoint + 'seen_candidates/' + study_id,httpOptions).pipe(
      map(ApiService.extractData));
  }

  getCompletedTrackStudy(study_id): Observable<any> {
    return this.http.get<any>(endpoint + 'completed_candidates/' + study_id,httpOptions).pipe(
      map(ApiService.extractData));
  }

  getAttemptedTrackStudy(study_id): Observable<any> {
    return this.http.get<any>(endpoint + 'attempted_candidates/' + study_id,httpOptions).pipe(
      map(ApiService.extractData));
  }

  getAcceptedRejectedTrackStudy(study_id): Observable<any> {
    return this.http.get<any>(endpoint + 'accepted_rejected_candidates/' + study_id,httpOptions).pipe(
      map(ApiService.extractData));
  }

  forgotCompletionCode(info): Observable<any> {
    return this.http.post<any>(endpoint + 'forgot_completion_code', info, httpOptions).pipe(
      tap((forgotCompletionCode) => console.log(`added class w/ id=${forgotCompletionCode.id}`)),
      catchError(this.handleError<any>('forgotCompletionCode'))
    );
  }
  
  AllstudyExcelSheet(): Observable<any> {
    return this.http.get<any>(endpoint + 'active_study_tracker.xlsx' ,httpOptions).pipe(
      map(ApiService.extractData));
  }


}
