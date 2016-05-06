(function() {

    var app = angular.module('cv', ['cv-sections']);

    // ----------- CV Controller
    app.controller('CurriculumCtrl', ['$http', '$log', '$filter',
        function($http, $log, $filter) {

            var cv = this;
            cv.informations = {};

            $http.get('cv-data.json').
            success(function(data) {
                cv.informations = data;

                var orderBy = $filter('orderBy');
                var orderedExperiences = [];

                orderedExperiences = orderBy(cv.informations.experiences, '-to_date');
                cv.position = orderedExperiences[0].job_position;
                cv.current_company_name = orderedExperiences[0].company.name;
                cv.current_company_url = orderedExperiences[0].company.url;
            }).
            error(function(data, status, headers, config) {
                $log.error(status);
            });
			
			//-----EDIT INFO---------------
			cv.info_disabled = false;
			cv.infoCountry_disabled = false;
			cv.infoCurrent_disabled = false;
			cv.infoEmail_disabled = false;
			cv.infoPhone_disabled = false;
			
			cv.info_Add = function() {
				cv.info_disabled = true;
				cv.infoCountry_disabled = true;
				cv.infoCurrent_disabled = true;
				cv.infoEmail_disabled = true;
				cv.infoPhone_disabled = true;
			};
			cv.info_cancel = function() {
				cv.info_disabled = false;
				cv.infoCountry_disabled = false;
				cv.infoCurrent_disabled = false;
				cv.infoEmail_disabled = false;
				cv.infoPhone_disabled = false;
			};
			cv.info_save = function() {
				if(angular.equals(cv.info_text, ""))
					cv.info_cancel();
				else{
					data = {
							'name': cv.info_text,
							'country': cv.infoCountry_text,
							'current': cv.infoCurrent_text,
							'email': cv.infoEmail,
							'phone_number': cv.infoPhone,
							'social_contact': ""
					};
					cv.informations.personal_infomations.push(data);
					cv.info_cancel();
				}
			};
			
			//Country
			cv.infoCountry_disabled = false;
			
			cv.infoCountry_cancel = function() {
				cv.infoCountry_disabled = false;
			};  
			cv.infoCountry_save = function(data) {
				if(angular.equals(cv.infoCountry_text, ""))
					cv.infoCountry_text = data.country;
				data.country = cv.infoCountry_text;
				cv.infoCountry_cancel();
			};
			
			cv.infoCountry_enabled = function(data) {
				cv.infoCountry_disabled = true;
				cv.infoCountry_text = data;
			};
			
			//Current
			cv.infoCurrent_disabled = false;
			
			cv.infoCurrent_cancel = function() {
				cv.infoCurrent_disabled = false;
			};  
			cv.infoCurrent_save = function(data) {
				if(angular.equals(cv.infoCurrent_text, ""))
					cv.infoCurrent_text = data.current;
				data.current = cv.infoCurrent_text;
				cv.infoCurrent_cancel();
			};
			
			cv.infoCurrent_enabled = function(data) {
				cv.infoCurrent_disabled = true;
				cv.infoCurrent_text = data;
			};
			
			//Email
			cv.infoEmail_disabled = false;
			
			cv.infoEmail_cancel = function() {
				cv.infoEmail_disabled = false;
			};  
			cv.infoEmail_save = function(data) {
				if(angular.equals(cv.infoEmail_text, ""))
					cv.infoEmail_text = data.email;
				data.email = cv.infoEmail_text;
				cv.infoEmail_cancel();
			};
			
			cv.infoEmail_enabled = function(data) {
				cv.infoEmail_disabled = true;
				cv.infoEmail_text = data;
			};
			//Phone
			cv.infoPhone_disabled = false;
			
			cv.infoPhone_cancel = function() {
				cv.infoPhone_disabled = false;
			};  
			cv.infoPhone_save = function(data) {
				if(angular.equals(cv.infoPhone_text, ""))
					cv.infoPhone_text = data.phone_number;
				data.phone_number = cv.infoPhone_text;
				cv.infoPhone_cancel();
			};
			
			cv.infoPhone_enabled = function(data) {
				cv.infoPhone_disabled = true;
				cv.infoPhone_text = data;
			};
			
			//-----EDIT SUMMARY------------
			cv.summary_disabled = false;
			cv.summary_Add = function() {
				cv.summary_disabled = true;
			};
			cv.summary_cancel = function() {
				cv.summary_disabled = false;
			};
			cv.summary_save = function() {
				if(angular.equals(cv.summary_text, ""))
					cv.summary_cancel();
				else{
					data = {
						'content': cv.summary_text
					}
					cv.informations.summary.push(data);	
					cv.summary_cancel();
				}
			};
			
			//----------------------------EDIT SKILLS-----------------------------
			cv.skills_disabled = false;
			cv.skillLevel_disabled = false;
			
			cv.skills_Add = function() {
				cv.skills_disabled = true;
				cv.skillLevel_disabled = true;
			};
			cv.skills_cancel = function() {
				cv.skills_disabled = false;
				cv.skillLevel_disabled = false;
			};
			cv.skills_save = function() {
				if(angular.equals(cv.skill_text, ""))
					cv.skills_cancel();
				else{
					data = {
						'name': cv.skill_text,
						'level': cv.skillLevel_text,
					};
					cv.informations.skills.push(data);
					
					cv.skills_cancel();
				}
			};
			
			//Level
			cv.skillLevel_disabled = false;
			
			cv.skillLevel_cancel = function() {
				cv.skillLevel_disabled = false;
			};  
			cv.skillLevel_save = function(data) {
				if(angular.equals(cv.skillLevel_text, ""))
					cv.skillLevel_text = data.level;
				data.level = cv.skillLevel_text;
				cv.skillLevel_cancel();
			};
			
			cv.skillLevel_enabled = function(data) {
				cv.skillLevel_disabled = true;
				cv.skillLevel_text = data;
			};
			
			//----------------------------EDIT EDUCATION--------------------------
			cv.education_disabled = false;
			cv.educationField_disabled = false;
			cv.educationDegree_disabled = false;
			cv.educationGrade_disabled = false;
			cv.educationFromDate_disabled = false;
			cv.educationToDate_disabled = false;
			cv.education_Add = function() {
				cv.education_disabled = true;
				cv.educationField_disabled = true;
				cv.educationDegree_disabled = true;
				cv.educationGrade_disabled = true;
				cv.educationFromDate_disabled = true;
				cv.educationToDate_disabled = true;
			};
			cv.education_cancel = function() {
				cv.education_disabled = false;
				cv.educationField_disabled = false;
				cv.educationDegree_disabled = false;
				cv.educationGrade_disabled = false;
				cv.educationFromDate_disabled = false;
				cv.educationToDate_disabled = false;
			};
			cv.education_save = function() {
				if(angular.equals(cv.education_text, ""))
					cv.education_cancel();
				else{
					data = {
						'school_name': cv.education_text,
						'field_of_study': cv.educationField_text,
						'degree': cv.educationDegree_text,
						'grade': cv.educationGrade_text,
						'from_date': cv.educationFromDate_text,
						'to_date': cv.educationToDate_text,
						'notes': ""
					};
					cv.informations.education.push(data);
					
					cv.education_cancel();
				}
			};
			
			//Grade
			cv.eduationGrade_disabled = false;
			
			cv.educationGrade_cancel = function() {
				cv.educationGrade_disabled = false;
			};  
			cv.educationGrade_save = function(data) {
				if(angular.equals(cv.educationGrade_text, ""))
					cv.educationGrade_text = data.grade;
				data.grade = cv.education_text;
				cv.educationGrade_cancel();
			};
			
			cv.educationGrade_enabled = function(data) {
				cv.educationGrade_disabled = true;
				cv.educationGrade_text = data;
			};
			
			//Field and Date
			cv.educationField_disabled = false;
			cv.educationFromDate_disabled = false;
			cv.educationToDate_disabled = false;
			
			cv.educationField_cancel = function() {
				cv.educationField_disabled = false;
				cv.educationFromDate_disabled = false;
				cv.educationToDate_disabled = false;
			};  
			cv.educationField_save = function(data) {
				if(angular.equals(cv.educationField_text, "") || angular.equals(cv.educationFieldFromDate_text, "") || angular.equals(cv.educationFieldToDate_text, "")) {
					cv.educationFiled_text = data.field_of_study;
					cv.educationFromDate_text = data.from_date;
					cv.educationToDate_text = data.to_date;
				}
				data.field_of_study = cv.educationField_text;
				data.from_date = cv.educationFromDate_text;
				data.to_date = cv.educationToDate_text;
				
				cv.educationFieldDate_cancel();
			};
			
			cv.educationField_enabled = function(data) {
				cv.educationField_disabled = true;
				cv.educationFromDate_disabled = true;
				cv.educationToDate_disabled = true;
				cv.educationField_text = data.field_of_study;
				cv.educationFromDate_text = data.from_date;
				cv.educationToDate_text = data.to_date;
			};
			
			
			//Degree
			
			cv.educationDegree_disabled = false;
			
			cv.educationDegree_cancel = function() {
				cv.educationDegree_disabled = false;
			};  
			cv.educationDegree_save = function(data) {
				if(angular.equals(cv.educationDegree_text, ""))
					cv.educationDegree_text = data.degree;
				data.degree = cv.educationDegree_text;
				cv.educationDegree_cancel();
			};
			
			cv.educationDegree_enabled = function(data) {
				cv.educationDegree_disabled = true;
				cv.educationDegree_text = data;
			};
			//----------------------------EDIT PROJECT----------------------------
			
			//Add Project
			cv.projectDescription_disabled = false;
			cv.projectFromDate_disabled = false;
			cv.projectToDate_disabled = false;
			cv.projectName_disabled = false;
			
			cv.Project_Add = function() {
				cv.projectDescription_disabled = true;
				cv.projectFromDate_disabled = true;
				cv.projectToDate_disabled = true;
				cv.projectName_disabled = true;
			};
			cv.Project_cancel = function() {
				cv.projectDescription_disabled = false;
				cv.projectFromDate_disabled = false;
				cv.projectToDate_disabled = false;
				cv.projectName_disabled = false;
			};
			cv.Project_save = function() {
				if(angular.equals(cv.projectName_text, ""))
					cv.Project_cancel();
				else{
					data = {
						'name': cv.projectName_text,						
						'description': cv.projectDescription_text,
						'to_date': cv.projectToDate_text,
						'from_date': cv.projectFromDate_text,
						'url': "http://"
					};
					cv.informations.projects.push(data);
					
					cv.Project_cancel();
				}
			};
			
			//Edit project
			cv.projectNameDate_disabled = false;
			cv.projectFromDate_disabled = false;
			cv.projectToDate_disabled = false;
			cv.projectDescriptionDate_disabled = false;
			
			
			cv.projectNameDate_cancel = function() {
				cv.projectNameDate_disabled = false;
				cv.projectFromDate_disabled = false;
				cv.projectToDate_disabled = false;
				cv.projectDescriptionDate_disabled = false;
			};  
			cv.projectNameDate_save = function(data) {
				if(angular.equals(cv.projectNameDate_text, "") || angular.equals(cv.projectDescriptionDate_text, "") || angular.equals(cv.projectFromDate_text, "") || angular.equals(cv.projectToDate_text, "")) {
					cv.projectNameDate_text = data.name;
					cv.projectFromDate_text = data.from_date;
					cv.projectToDate_text = data.to_date;
					cv.projectDescriptionDate_text = data.description;
				}
				data.name = cv.projectNameDate_text;
				data.from_date = cv.projectFromDate_text;
				data.to_date = cv.projectToDate_text;
				data.description = cv.projectDescriptionDate_text;
				
				cv.projectNameDate_cancel();
			};
			
			cv.projectNameDate_enabled = function(data) {
				cv.projectNameDate_disabled = true;
				cv.projectFromDate_disabled = true;
				cv.projectToDate_disabled = true;
				cv.projectDescriptionDate_disabled = true;
				cv.projectNameDate_text = data.name;
				cv.projectFromDate_text = data.from_date;
				cv.projectToDate_text = data.to_date;
				cv.projectDescriptionDate_text = data.description;
			};
			
			//-----EDIT EXPERIENCE---------
			cv.expJob_disabled = false;
			cv.expCompanyName_disabled = false;
			cv.expLocation_disabled = false;
			cv.expFromDate_disabled = false;
			cv.expToDate_disabled = false;
			cv.expDetail_disabled = false;
			cv.expJob_Add = function() {
				cv.expJob_disabled = true;
				cv.expCompanyName_disabled = true;
				cv.expLocation_disabled = true;
				cv.expFromDate_disabled = true;
				cv.expToDate_disabled = true;
				cv.expDetail_disabled = true;
			};
			cv.expJob_cancel = function() {
				cv.expJob_disabled = false;
				cv.expCompanyName_disabled = false;
				cv.expLocation_disabled = false;
				cv.expFromDate_disabled = false;
				cv.expToDate_disabled = false;
				cv.expDetail_disabled = false;
			};
			cv.expJob_save = function() {
				if(angular.equals(cv.expJob_text, ""))
					cv.expJob_cancel();
				else{
					data = {
						'job_position': cv.expJob_text,
						'company': {
							'location': cv.expSchool_text,
							'name': cv.expLocation_text,
							'url': "http://"
						},
						'from_date': cv.expFromDate_text,
						'to_date': cv.expToDate_text,
						'job_description': cv.expDetail_text
					};
					cv.informations.experiences.push(data);
					
					cv.expJob_cancel();
				}
			};
			
			//Job Position
			cv.expJobPosition_disabled = false;
			
			cv.expJobPosition_cancel = function() {
				cv.expJobPosition_disabled = false;
			};  
			cv.expJobPosition_save = function(data) {
				if(angular.equals(cv.expJobPosition_text, ""))
					cv.expJobPosition_text = data.job_position;
				data.job_position = cv.expJobPosition_text;
				cv.expJobPosition_cancel();
			};
			
			cv.expJobPosition_enabled = function(data) {
				cv.expJobPosition_disabled = true;
				cv.expJobPosition_text = data;
			};
			
			//Company and Date
			cv.expCompany_disabled = false;
			cv.expFromDate_disabled = false;
			cv.expToDate_disabled = false;
			
			cv.expCompanyDate_cancel = function() {
				cv.expCompany_disabled = false;
				cv.expFromDate_disabled = false;
				cv.expToDate_disabled = false;
			};  
			cv.expCompanyDate_save = function(data) {
				if(angular.equals(cv.expCompany_text, "") || angular.equals(cv.expFromDate_text, "") || angular.equals(cv.expToDate_text, "")) {
					cv.expCompany_text = data.company.name;
					cv.expFromDate_text = data.from_date;
					cv.expToDate_text = data.to_date;
				}
				data.company.name = cv.expCompany_text;
				data.from_date = cv.expFromDate_text;
				data.to_date = cv.expToDate_text;
				
				cv.expCompanyDate_cancel();
			};
			
			cv.expCompanyDate_enabled = function(data) {
				cv.expCompany_disabled = true;
				cv.expFromDate_disabled = true;
				cv.expToDate_disabled = true;
				cv.expCompany_text = data.company.name;
				cv.expFromDate_text = data.from_date;
				cv.expToDate_text = data.to_date;
			};
			
			
			//Job Description
			
			cv.expJobDescription_disabled = false;
			
			cv.expJobDescription_cancel = function() {
				cv.expJobDescription_disabled = false;
			};  
			cv.expJobDescription_save = function(data) {
				if(angular.equals(cv.expJobDescription_text, ""))
					cv.expJobDescription_text = data.job_description;
				data.job_description = cv.expJobDescription_text;
				cv.expJobDescription_cancel();
			};
			
			cv.expJobDescription_enabled = function(data) {
				cv.expJobDescription_disabled = true;
				cv.expJobDescription_text = data;
			};
        }
    ]);
	

})();