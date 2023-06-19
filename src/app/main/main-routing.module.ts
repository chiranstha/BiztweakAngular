import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                children: [
                    
                    {
                        path: 'lmsAssignment/lmsprorities',
                        loadChildren: () => import('./lmsAssignment/lmsprorities/lmsprority.module').then(m => m.LmsprorityModule),
                        data: { permission: 'Pages.Lmsprorities' }
                    },
                

                    {
                        path: 'lmsAssignment/jobRecommendations',
                        loadChildren: () => import('./lmsAssignment/jobRecommendations/jobRecommendation.module').then(m => m.JobRecommendationModule),
                        data: { permission: 'Pages.JobRecommendations' }
                    },
                    {
                        path: 'lmsAssignment/jobRecommendations/:assignmentId',
                        loadChildren: () => import('./lmsAssignment/jobRecommendations/jobRecommendation.module').then(m => m.JobRecommendationModule),
                        data: { permission: 'Pages.JobRecommendations' }
                    },


                    {
                        path: 'lmsAssignment/courseRecommendations',
                        loadChildren: () => import('./lmsAssignment/courseRecommendations/courseRecommendation.module').then(m => m.CourseRecommendationModule),
                        data: { permission: 'Pages.CourseRecommendations' }
                    },

                    {
                        path: 'lmsAssignment/courseRecommendations/:assignmentId',
                        loadChildren: () => import('./lmsAssignment/courseRecommendations/courseRecommendation.module').then(m => m.CourseRecommendationModule),
                        data: { permission: 'Pages.CourseRecommendations' }
                    },


                    {
                        path: 'master/jobs',
                        loadChildren: () => import('./master/jobs/job.module').then(m => m.JobModule),
                        data: { permission: 'Pages.Jobs' }
                    },


                    {
                        path: 'lmsAssignment/assignmentTypes',
                        loadChildren: () => import('./lmsAssignment/assignmentTypes/assignmentType.module').then(m => m.AssignmentTypeModule),
                        data: { permission: 'Pages.AssignmentTypes' }
                    },

                    {
                        path: 'master/businessPhases',
                        loadChildren: () => import('./master/businessPhases/businessPhase.module').then(m => m.BusinessPhaseModule),
                        data: { permission: 'Pages.BusinessPhases' }
                    },


                    {
                        path: 'master/entrepreneurAssigment',
                        loadChildren: () => import('./master/entrepreneurAssigment/entrepreneurAssigment.module').then(m => m.EntrepreneurAssigmentModule),
                        data: { permission: 'Pages.EntrepreneurAssigment' }
                    },
                 

                    {
                        path: 'master/entrepreneurAttendance',
                        loadChildren: () => import('./master/entrepreneurAttendance/entrepreneurAttendance.module').then(m => m.EntrepreneurAttendanceModule),
                        data: { permission: 'Pages.EntrepreneurAttendance' }
                    },
                    {
                        path: 'master/entrepreneurSubmitted/:id',
                        loadChildren: () => import('./master/entrepreneurSubmitted/entrepreneurSubmitted.module').then(m => m.EntrepreneurSubmittedModule),
                        data: { permission: 'Pages.EntrepreneurAttendance' }
                    },

                    {
                        path: 'digitalTool/digitalResource',
                        loadChildren: () => import('./digitalTool/digitalResource/digitalResource.module').then(m => m.DigitalResourceModule),
                        //data: { permission: 'Pages.DigitalResource' }
                    },


                    {
                        path: 'digitalTool/digitalCateogories',
                        loadChildren: () => import('./digitalTool/digitalCateogories/digitalCateogory.module').then(m => m.DigitalCateogoryModule),
                        data: { permission: 'Pages.DigitalCateogories' }
                    },


                    {
                        path: 'lms/entrepreneurStates',
                        loadChildren: () => import('./lms/entrepreneurStates/entrepreneurState.module').then(m => m.EntrepreneurStateModule),
                       // data: { permission: 'Pages.EntrepreneurStates' }
                    },


                    {
                        path: 'lms/growthPlans',
                        loadChildren: () => import('./lms/growthPlans/growthPlan.module').then(m => m.GrowthPlanModule),
                        //data: { permission: 'Pages.GrowthPlans' }
                    },

                    {
                        path: 'lms/growthPlans/:id',
                        loadChildren: () => import('./lms/growthPlans/growthPlan.module').then(m => m.GrowthPlanModule),
                        //data: { permission: 'Pages.GrowthPlans' }
                    },


                    {
                        path: 'master/bank',
                        loadChildren: () => import('./master/bank/bank.module').then(m => m.BankModule),
                        data: { permission: 'Pages.Bank' }
                    },


                    {
                        path: 'master/company',
                        loadChildren: () => import('./master/company/company.module').then(m => m.CompanyModule),
                        data: { permission: 'Pages.Company' }
                    },


                    {
                        path: 'master/entrepreneurs',
                        loadChildren: () => import('./master/entrepreneurs/entrepreneur.module').then(m => m.EntrepreneurModule),
                        data: { permission: 'Pages.Entrepreneurs' }
                    },


                    {
                        path: 'master/instructor',
                        loadChildren: () => import('./master/instructor/instructors.module').then(m => m.InstructorsModule),
                        data: { permission: 'Pages.Instructor' }
                    },
                    {
                        path: 'master/incubator',
                        loadChildren: () => import('./master/incubator/incubator.module').then(m => m.IncubatorModule),
                        data: { permission: 'Pages.Instructor' }
                    },

                    {
                        path: 'master/industries',
                        loadChildren: () => import('./master/industries/industry.module').then(m => m.IndustryModule),
                        data: { permission: 'Pages.Industries' }
                    },


                    {
                        path: 'lmsAssignment/assignments',
                        loadChildren: () => import('./lmsAssignment/assignments/assignment.module').then(m => m.AssignmentModule),
                        data: { permission: 'Pages.Assignments' }
                    },


                    {
                        path: 'lmsAssignment/assignmentCategories',
                        loadChildren: () => import('./lmsAssignment/assignmentCategories/assignmentCategory.module').then(m => m.AssignmentCategoryModule),
                        data: { permission: 'Pages.AssignmentCategories' }
                    },

                    // {
                    //     path: 'lmsAssignment/assignmentCategories/edit/:id',
                    //     loadChildren: () => import('./lmsAssignment/assignmentCategories/create-or-edit-assignmentCategory-modal.component').then(m => m.CreateOrEditAssignmentCategoryModalComponent),
                    //     data: { permission: 'Pages.AssignmentCategories' }
                    // },

                    {
                        path: 'lms/lessons',
                        loadChildren: () => import('./lms/lessons/lesson.module').then(m => m.LessonModule),
                        data: { permission: 'Pages.Lessons' }
                    },
                    {
                        path: 'lms/courseSections',
                        loadChildren: () => import('./lms/courseSections/courseSection.module').then(m => m.CourseSectionModule),
                        data: { permission: 'Pages.CourseSections' }
                    },
                    {
                        path: 'lms/courses',
                        loadChildren: () => import('./lms/courses/course.module').then(m => m.CourseModule),
                        //data: { permission: 'Pages.Courses' }
                    },
                    {
                        path: 'lms/courses/add/:id',
                        loadChildren: () => import('./lms/courses/coursesDescription/coursesDescription.module').then(m => m.CoursesDescriptionModule),
                        data: { permission: '' }
                    },
                    {
                        path: 'lms/courseCategories',
                        loadChildren: () => import('./lms/courseCategories/courseCategory.module').then(m => m.CourseCategoryModule),
                        data: { permission: 'Pages.CourseCategories' }
                    },

                    {
                        path: 'dashboard',
                        loadChildren: () => import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
                        data: { permission: 'Pages.Tenant.Dashboard' },
                    },

                    {
                        path: 'entrepreneurData',
                        loadChildren: () => import('./dashboard/entrepreneurData/entrepreneurData.module').then((m) => m.EntrepreneurDataModule),
                        data: { permission: 'Pages.Tenant.Dashboard' },
                    },
                    {
                        path: 'consultantData',
                        loadChildren: () => import('./dashboard/consultantData/consultantData.module').then((m) => m.ConsultantDataModule),
                        data: { permission: 'Pages.Tenant.Dashboard' },
                    },
                    {
                        path: 'mentorsData',
                        loadChildren: () => import('./dashboard/mentorsData/mentorsData.module').then((m) => m.MentorsDataModule),
                        data: { permission: 'Pages.Tenant.Dashboard' },
                    },
                    {
                        path: 'incubatorsData',
                        loadChildren: () => import('./dashboard/incubatorsData/incubatorsData.module').then((m) => m.IncubatorsDataModule),
                        data: { permission: 'Pages.Tenant.Dashboard' },
                    },
                    {
                        path: 'jobSection',
                        loadChildren: () => import('./lms/jobSection/jobSection.module').then((m) => m.JobSectionModule),
                        data: {  },
                    },
                    {
                        path: 'courseRecommendation',
                        loadChildren: () => import('./lms/courseRecommendation/courseRecommendation.module').then((m) => m.CourseRecommendationModule),
                        data: {  },
                    },
                    // Enterpreneur Routing Start
                    {
                        path: 'EnterpreneurDashboard',
                        loadChildren: () => import('./enterpreneurProfile/EnterpreneurDashboard/EnterpreneurDashboard.module').then(m => m. EnterpreneurDashboardModule),
                        data: { permission: '' }
                    },

                    {
                        path: 'enterpreneurCourseProfile',
                        loadChildren: () => import('./enterpreneurProfile/enterpreneurCourseProfile/enterpreneurCourseProfile.module').then(m => m.EnterpreneurCourseProfileModule),
                        data: { permission: '' }
                    },
                    {
                        path: 'message',
                        loadChildren: () => import('./enterpreneurProfile/message/message.module').then(m => m.MessageModule),
                        data: { permission: '' }
                    },
                    {
                        path: 'CourseProgress',
                        loadChildren: () => import('./enterpreneurProfile/CourseProgress/CourseProgress.module').then(m => m.CourseProgressModule),
                        data: { permission: '' }
                    },

                    {
                        path: 'EnterpreneurGrowthPlan',
                        loadChildren: () => import('./enterpreneurProfile/EnterpreneurGrowthPlan/EnterpreneurGrowthPlan.module').then(m => m.EnterpreneurGrowthPlanModule),
                        data: { permission: '' }
                    },
                    {
                        path: 'EnterpreneurState',
                        loadChildren: () => import('./enterpreneurProfile/EnterpreneurState/EnterpreneurState.module').then(m => m.EnterpreneurStateModule),
                        data: { permission: '' }
                    },
                    {
                        path: 'EnterpreneurAssessment',
                        loadChildren: () => import('./enterpreneurProfile/EnterpreneurAssessment/EnterpreneurAssessment.module').then(m => m. EnterpreneurAssessmentModule),
                        data: { permission: '' }
                    },
                    {
                        path: 'EnterpreneurAssessment/:id',
                        loadChildren: () => import('./enterpreneurProfile/EnterpreneurAssessment/EnterpreneurAssessment.module').then(m => m. EnterpreneurAssessmentModule),
                        data: { permission: '' }
                    },
                    {
                        path: 'EnterpreneurCompany',
                        loadChildren: () => import('./enterpreneurProfile/EnterpreneurCompany/EnterpreneurCompany.module').then(m => m. EnterpreneurCompanyModule),
                        data: { permission: '' }
                    },
                    {
                        path: 'EnterpreneurCompany/:id',
                        loadChildren: () => import('./enterpreneurProfile/EnterpreneurCompany/EnterpreneurCompany.module').then(m => m. EnterpreneurCompanyModule),
                        data: { permission: '' }
                    },
                    {
                        path: 'ManageCompany',
                        loadChildren: () => import('./enterpreneurProfile/entrepreneurManageCompany/entrepreneurManageCompany.module').then(m => m.EntrepreneurManageCompanyModule),
                        data: { permission: '' }
                    },
                    {
                        path: 'ManageCompany/:id',
                        loadChildren: () => import('./enterpreneurProfile/entrepreneurManageCompany/entrepreneurManageCompany.module').then(m => m.EntrepreneurManageCompanyModule),
                        data: { permission: '' }
                    },
                    {
                        path: 'ReportSummary',
                        loadChildren: () => import('./enterpreneurProfile/entrepreneurReportSummary/entrepreneurReportSummary.module').then(m => m.EntrepreneurReportSummaryModule),
                        data: { permission: '' }
                    },
                    {
                        path: 'ReportSummary/:id',
                        loadChildren: () => import('./enterpreneurProfile/entrepreneurReportSummary/entrepreneurReportSummary.module').then(m => m.EntrepreneurReportSummaryModule),
                        data: { permission: '' }
                    },
                    {
                        path: 'EnterpreneurProfileSetting',
                        loadChildren: () => import('./enterpreneurProfile/EnterpreneurProfileSetting/EnterpreneurProfileSetting.module').then(m => m. EnterpreneurProfileSettingModule),
                        data: { permission: '' }
                    },
                    {
                        path: 'BusinessHealthReport',
                        loadChildren: () => import('./enterpreneurProfile/BusinessHealthReport/BusinessHealthReport.module').then(m => m. BusinessHealthReportModule),
                        data: { permission: '' }
                    },
                    {
                        path: 'EnterpreneurDigitalTools',
                        loadChildren: () => import('./enterpreneurProfile/EnterpreneurDigitalTools/EnterpreneurDigitalTools.module').then(m => m. EnterpreneurDigitalToolsModule),
                        data: { permission: '' }
                    },
                    {
                        path: 'message',
                        loadChildren: () => import('./enterpreneurProfile/message/message.module').then(m => m. MessageModule),
                        data: { permission: '' }
                    },
                    {
                        path: 'entrepreneurLMS',
                        loadChildren: () => import('./enterpreneurProfile/entrepreneurLMS/entrepreneurLMS.module').then(m => m.EntrepreneurLMSModule),
                        data: { permission: '' }
                    },

                    {
                        path: 'payment',
                        loadChildren: () => import('./enterpreneurProfile/CoursePayment/CoursePayment.module').then(m => m.CoursePaymentModule),
                        data: { permission: '' }
                    },
                    {
                        path: 'myCourses',
                        loadChildren: () => import('./enterpreneurProfile/myCourses/myCourses.module').then(m => m.MyCoursesModule),
                        data: { permission: '' }
                    },
                    // Instructor Routing Started
                    {
                        path: 'instructorDashboard',
                        loadChildren: () => import('./InstructorProfile/instructorDashboard/instructorDashboard.module').then(m => m.InstructorDashboardModule),
                        data: { permission: '' }
                    },
                    {
                        path: 'instructorAdminUsers',
                        loadChildren: () => import('./InstructorProfile/instructorAdminUsers/instructorAdminUsers.module').then(m => m.InstructorAdminUsersModule),
                        data: { permission: '' }
                    },
                    {
                        path: 'instructorEntrepreneurReport',
                        loadChildren: () => import('./InstructorProfile/instructorEntrepreneurReport/instructorEntrepreneurReport.module').then(m => m.InstructorEntrepreneurReportModule),
                        data: { permission: '' }
                    },
                    {
                        path: 'instructorstatistics',
                        loadChildren: () => import('./InstructorProfile/instructorstatistics/instructorstatistics.module').then(m => m.InstructorstatisticsModule),
                        data: { permission: '' }
                    },
                    {
                        path: 'Submission',
                        loadChildren: () => import('./InstructorProfile/Submission/Submission.module').then(m => m.SubmissionModule),
                        data: { permission: '' }
                    },
                    {
                        path: 'Calendar',
                        loadChildren: () => import('./InstructorProfile/Calendar/Calendar.module').then(m => m.CalendarModule),
                        data: { permission: '' }
                    },
                    {
                        path: 'Attendance',
                        loadChildren: () => import('./InstructorProfile/Attendance/Attendance.module').then(m => m.AttendanceModule),
                        data: { permission: '' }
                    },
                    {
                        path: 'More',
                        loadChildren: () => import('./InstructorProfile/More/More.module').then(m => m.MoreModule),
                        data: { permission: '' }
                    },

                    // Incubator Routing
                    {
                        path: 'incubatorDashboard',
                        loadChildren: () => import('./IncubatorProfiles/incubatorDashboard/incubatorDashboard.module').then(m => m.IncubatorDashboardModule),
                        data: { permission: '' }
                    },
                    {
                        path: 'incubatorEntrepreneurReport',
                        loadChildren: () => import('./IncubatorProfiles/incubatorEntrepreneurReport/incubatorEntrepreneurReport.module').then(m => m.IncubatorEntrepreneurReportModule),
                        data: { permission: '' }
                    },
                    {
                        path: 'incubatorAdminUsers',
                        loadChildren: () => import('./IncubatorProfiles/incubatorAdminUsers/incubatorAdminUsers.module').then(m => m.IncubatorAdminUsersModule),
                        data: { permission: '' }
                    },
                    {
                        path: 'incubatorCalendar',
                        loadChildren: () => import('./IncubatorProfiles/incubatorCalendar/incubatorCalendar.module').then(m => m.IncubatorCalendarModule),
                        data: { permission: '' }
                    },


                    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
                    { path: '**', redirectTo: 'dashboard' },
                ],
            },
        ]),
    ],
    exports: [RouterModule],
})
export class MainRoutingModule { }
