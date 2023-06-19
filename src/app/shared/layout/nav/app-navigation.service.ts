import { PermissionCheckerService } from 'abp-ng2-module';
import { AppSessionService } from '@shared/common/session/app-session.service';

import { Injectable } from '@angular/core';
import { AppMenu } from './app-menu';
import { AppMenuItem } from './app-menu-item';
import { UserTypeEnum } from '@shared/service-proxies/service-proxies';

@Injectable()
export class AppNavigationService {
    constructor(
        private _permissionCheckerService: PermissionCheckerService,
        private _appSessionService: AppSessionService
    ) { }

    getMenu(): AppMenu {
        if (this._appSessionService.user.userType === UserTypeEnum.SuperAdmin) {
            return new AppMenu('MainMenu', 'MainMenu', [
                new AppMenuItem(
                    'Dashboard',
                    'Pages.Administration.Host.Dashboard',
                    'fa-duotone fa-gear',
                    '/app/admin/hostDashboard'
                ),
                new AppMenuItem('Dashboard', 'Pages.Tenant.Dashboard', 'fa-duotone fa-gear', '/app/main/dashboard'),
                // new AppMenuItem('entrepreneurData', 'Pages.Tenant.Dashboard', 'fa-duotone fa-gear', '/app/main/dashboard/entrepreneurData'),
                new AppMenuItem('Tenants', 'Pages.Tenants', 'flaticon-list-3', '/app/admin/tenants'),
                new AppMenuItem('CourseCategories', 'Pages.CourseCategories', 'fa-duotone fa-layer-group', '/app/main/lms/courseCategories'),
                new AppMenuItem('Courses', '', 'fa-duotone fa-books', '/app/main/lms/courses'),
                new AppMenuItem('BusinessPhases', 'Pages.BusinessPhases', 'fa-duotone fa-chart-line', '/app/main/master/businessPhases'),
                new AppMenuItem('AssignmentCategories', 'Pages.AssignmentCategories', 'fa-duotone fa-layer-group', '/app/main/lmsAssignment/assignmentCategories'),
                new AppMenuItem('Assignments', 'Pages.Assignments', 'fa-duotone fa-list-check', '/app/main/lmsAssignment/assignments'),

                new AppMenuItem('Industries', 'Pages.Industries', 'fa-duotone fa-building-columns', '/app/main/master/industries'),

                new AppMenuItem('Instructor', 'Pages.Instructor', 'fa-duotone fa-user', '/app/main/master/instructor'),
                new AppMenuItem('Incubator', 'Pages.Incubator', 'fa-duotone fa-user', '/app/main/master/incubator'),
                new AppMenuItem('Entrepreneurs', 'Pages.Entrepreneurs', 'fa-duotone fa-user-tie', '/app/main/master/entrepreneurs'),
                new AppMenuItem('Company', 'Pages.Company', 'fa-duotone fa-building', '/app/main/master/company'),
                new AppMenuItem('Bank', 'Pages.Bank', 'fa-duotone fa-building-columns', '/app/main/master/bank'),
                new AppMenuItem('Digital Categories', 'Pages.DigitalCateogories', 'fa-duotone fa-layer-group', '/app/main/digitalTool/digitalCateogories'),
                new AppMenuItem('EntrepreneurAttendance', 'Pages.EntrepreneurAttendance', 'fa-duotone fa-calendar-days', '/app/main/master/entrepreneurAttendance'),
                new AppMenuItem('AssignmentTypes', 'Pages.AssignmentTypes', 'fa-duotone fa-notebook', '/app/main/lmsAssignment/assignmentTypes'),
                new AppMenuItem('Jobs', 'Pages.Jobs', 'fa-duotone fa-user-tie-hair', '/app/main/master/jobs'),
               
            new AppMenuItem('Lmsprorities', 'Pages.Lmsprorities', 'fa-duotone fa-arrow-up-arrow-down', '/app/main/lmsAssignment/lmsprorities'),
             new AppMenuItem('Editions', 'Pages.Editions', 'flaticon-app', '/app/admin/editions'),
                new AppMenuItem(
                    'Administration',
                    '',
                    'fa-duotone fa-people-roof',
                    '',
                    [],
                    [
                        new AppMenuItem(
                            'OrganizationUnits',
                            'Pages.Administration.OrganizationUnits',
                            'fa-duotone fa-poll-people',
                            '/app/admin/organization-units'
                        ),
                        new AppMenuItem('Roles', 'Pages.Administration.Roles', 'fa-duotone fa-person', '/app/admin/roles'),
                        new AppMenuItem('Users', 'Pages.Administration.Users', 'fa-duotone fa-users', '/app/admin/users'),
                        new AppMenuItem(
                            'Languages',
                            'Pages.Administration.Languages',
                            'fa-duotone fa-language',
                            '/app/admin/languages',
                            ['/app/admin/languages/{name}/texts']
                        ),
                        new AppMenuItem(
                            'AuditLogs',
                            'Pages.Administration.AuditLogs',
                            'fa-duotone fa-list-check',
                            '/app/admin/auditLogs'
                        ),
                        new AppMenuItem(
                            'Maintenance',
                            'Pages.Administration.Host.Maintenance',
                            'fa-duotone fa-sliders',
                            '/app/admin/maintenance'
                        ),
                        new AppMenuItem(
                            'Subscription',
                            'Pages.Administration.Tenant.SubscriptionManagement',
                            'fa-duotone fa-hand-pointer',
                            '/app/admin/subscription-management'
                        ),
                        new AppMenuItem(
                            'VisualSettings',
                            'Pages.Administration.UiCustomization',
                            'fa-duotone fa-eye',
                            '/app/admin/ui-customization'
                        ),
                        new AppMenuItem(
                            'WebhookSubscriptions',
                            'Pages.Administration.WebhookSubscription',
                            'fa-duotone fa-bell',
                            '/app/admin/webhook-subscriptions'
                        ),
                        new AppMenuItem(
                            'DynamicProperties',
                            'Pages.Administration.DynamicProperties',
                            'fa-duotone fa-star',
                            '/app/admin/dynamic-property'
                        ),
                        new AppMenuItem(
                            'Settings',
                            'Pages.Administration.Host.Settings',
                            'fa-duotone fa-gear',
                            '/app/admin/hostSettings'
                        ),
                        new AppMenuItem(
                            'Settings',
                            'Pages.Administration.Tenant.Settings',
                            'fa-duotone fa-gear',
                            '/app/admin/tenantSettings'
                        ),
                        new AppMenuItem(
                            'Notifications',
                            '',
                            'fa-duotone fa-bell',
                            '',
                            [],
                            [
                                new AppMenuItem(
                                    'Inbox',
                                    'fa-duotone fa-message',
                                    'flaticon-mail-1',
                                    '/app/notifications'
                                ),
                                new AppMenuItem(
                                    'MassNotifications',
                                    'Pages.Administration.MassNotification',
                                    'fa-duotone fa-bells',
                                    '/app/admin/mass-notifications'
                                )
                            ]
                        )
                    ]
                ),
                new AppMenuItem(
                    'DemoUiComponents',
                    'Pages.DemoUiComponents',
                    'fa-duotone fa-sliders',
                    '/app/admin/demo-ui-components'
                ),
            ]);
        } else if (this._appSessionService.user.userType === UserTypeEnum.Entrepreneur) {
            return new AppMenu('MainMenu', 'MainMenu', [
                new AppMenuItem(
                    'Dashboard',
                    '',
                    'fa-duotone fa-gear',
                    '/app/main/EnterpreneurDashboard'
                ),
                new AppMenuItem(
                    'My Course',
                    '',
                    'fa-duotone fa-book-open-reader',
                    '/app/main/EnterpreneurCourses'
                ),
                new AppMenuItem(
                    'Profile',
                    '',
                    'fa-duotone fa-user-tie',
                    '/app/main/enterpreneurCourseProfile'
                ),
                new AppMenuItem(
                    'CourseProgress',
                    '',
                    'fa-duotone fa-clock',
                    '/app/main/CourseProgress'
                ),
                new AppMenuItem(
                    'entrepreneurLMS',
                    '',
                    'fa-duotone fa-book-open-reader',
                    '/app/main/entrepreneurLMS'
                ),

                new AppMenuItem(
                    'Message',
                    '',
                    'fa-duotone fa-envelope',
                    '/app/main/message'
                ),
                new AppMenuItem(
                    'Digital Tools',
                    '',
                    'fa-duotone fa-gear',
                    '/app/main/EnterpreneurDigitalTools'
                ),
                new AppMenuItem(
                    'Growth Plan',
                    '',
                    'fa-duotone fa-chart-mixed',
                    '/app/main/EnterpreneurGrowthPlan'
                ),
                new AppMenuItem(
                    'Enterpreneur State',
                    '',
                    'fa-duotone fa-chart-simple',
                    '/app/main/EnterpreneurState'
                ),
                new AppMenuItem(
                    'Assessment',
                    '',
                    'fa-duotone fa-file-pen',
                    '/app/main/EnterpreneurAssessment'
                ),
                new AppMenuItem(
                    'Company Profile',
                    '',
                    'fa-duotone fa-users-gear',
                    '/app/main/EnterpreneurCompany'
                ),
                new AppMenuItem(
                    'Profile Setting',
                    '',
                    'fa-duotone fa-user-gear',
                    '/app/main/EnterpreneurProfileSetting'
                ),
                new AppMenuItem(
                    'Business Health Report',
                    '',
                    'fa-duotone fa-memo-pad',
                    '/app/main/BusinessHealthReport'
                ),


            ]);
        } else if (this._appSessionService.user.userType === UserTypeEnum.Encubator) {
            return new AppMenu('MainMenu', 'MainMenu', [
                new AppMenuItem('Dashboard', '', 'fa-duotone fa-gear', '/app/main/incubatorDashboard'),
                new AppMenuItem('Entrepreneur Report', '', 'fa-duotone fa-chart-simple', '/app/main/incubatorEntrepreneurReport'),
                new AppMenuItem('Admin Users', '', 'fa-duotone fa-user', '/app/main/incubatorAdminUsers'),
                new AppMenuItem('Calendar', '', 'fa-duotone fa-calendar', '/app/main/incubatorCalendar'),

            ]);
        } else if (this._appSessionService.user.userType === UserTypeEnum.Coach ||
            this._appSessionService.user.userType === UserTypeEnum.Mentors ||
            this._appSessionService.user.userType === UserTypeEnum.Consultant ||
            this._appSessionService.user.userType === UserTypeEnum.Encubator) {
            return new AppMenu('MainMenu', 'MainMenu', [
                new AppMenuItem(
                    'Dashboard',
                    '',
                    'fa-duotone fa-gear',
                    '/app/main/instructorDashboard'
                ),
                new AppMenuItem(
                    'Admin User',
                    '',
                    'fa-duotone fa-user',
                    '/app/main/instructorAdminUsers'
                ),
                new AppMenuItem(
                    'Statistics',
                    '',
                    'fa-duotone fa-chart-simple',
                    '/app/main/instructorstatistics'
                ),
                new AppMenuItem(
                    'Entrepreneur report',
                    '',
                    'fa-duotone fa-chart-simple',
                    '/app/main/instructorEntrepreneurReport'
                ),
                new AppMenuItem(
                    'Submission',
                    '',
                    'fa-duotone fa-memo-circle-check',
                    '/app/main/Submission'
                ),
                new AppMenuItem(
                    'Calendar',
                    '',
                    'fa-duotone fa-calendar',
                    '/app/main/Calendar'
                ),
                new AppMenuItem(
                    'Attendance',
                    '',
                    'fa-duotone fa-calendar-days',
                    '/app/main/Attendance'
                ),
                new AppMenuItem(
                    'More',
                    '',
                    'fa-duotone fa-ellipsis',
                    '/app/main/More'
                ),
                new AppMenuItem('Courses', '', 'fa-duotone fa-books', '/app/main/lms/courses'),
                new AppMenuItem('GrowthPlans', '', 'fa-duotone fa-chart-mixed', '/app/main/lms/growthPlans'),
                new AppMenuItem('EntrepreneurStates', '', 'fa-duotone fa-users', '/app/main/lms/entrepreneurStates'),
                new AppMenuItem('DigitalResource', '', 'fa-duotone fa-globe', '/app/main/digitalTool/digitalResource')
            ]);
        }
        //     else {
        //     return new AppMenu('MainMenu', 'MainMenu', [
        //         new AppMenuItem(
        //             'Dashboard',
        //             'Pages.Administration.Host.Dashboard',
        //             'fa-duotone fa-gear',
        //             '/app/admin/hostDashboard'
        //         ),
        //         new AppMenuItem('Dashboard', 'Pages.Tenant.Dashboard', 'fa-duotone fa-gear', '/app/main/dashboard'),
        //         new AppMenuItem('Tenants', 'Pages.Tenants', 'flaticon-list-3', '/app/admin/tenants'),
        //         new AppMenuItem('CourseCategories', 'Pages.CourseCategories', 'fa-duotone fa-layer-group', '/app/main/lms/courseCategories'),

        //         new AppMenuItem('Courses', 'Pages.Courses', 'fa-duotone fa-books', '/app/main/lms/courses'),

        //         new AppMenuItem('CourseSections', 'Pages.CourseSections', 'fa-duotone fa-section', '/app/main/lms/courseSections'),

        //         new AppMenuItem('Lessons', 'Pages.Lessons', 'fa-duotone fa-chalkboard-user', '/app/main/lms/lessons'),

        //         new AppMenuItem('AssignmentCategories', 'Pages.AssignmentCategories', 'fa-duotone fa-layer-group', '/app/main/lmsAssignment/assignmentCategories'),

        //         new AppMenuItem('Assignments', 'Pages.Assignments', 'fa-duotone fa-list-check', '/app/main/lmsAssignment/assignments'),

        //         new AppMenuItem('Industries', 'Pages.Industries', 'fa-duotone fa-building-columns', '/app/main/master/industries'),

        //         new AppMenuItem('Instructor', 'Pages.Instructor', 'fa-duotone fa-user', '/app/main/master/instructor'),

        //         new AppMenuItem('Entrepreneurs', 'Pages.Entrepreneurs', 'fa-duotone fa-user-tie', '/app/main/master/entrepreneurs'),

        //         new AppMenuItem('Company', 'Pages.Company', 'fa-duotone fa-building', '/app/main/master/company'),

        //         new AppMenuItem('Bank', 'Pages.Bank', 'fa-duotone fa-building-columns', '/app/main/master/bank'),

        //         new AppMenuItem('GrowthPlans', 'Pages.GrowthPlans', 'fa-duotone fa-chart-mixed', '/app/main/lms/growthPlans'),

        //         new AppMenuItem('EntrepreneurStates', 'Pages.EntrepreneurStates', 'fa-duotone fa-users', '/app/main/lms/entrepreneurStates'),

        //         new AppMenuItem('DigitalCateogories', 'Pages.DigitalCateogories', 'fa-duotone fa-layer-group', '/app/main/digitalTool/digitalCateogories'),

        //         new AppMenuItem('DigitalResource', 'Pages.DigitalResource', 'fa-duotone fa-globe', '/app/main/digitalTool/digitalResource'),

        //         new AppMenuItem('EntrepreneurAttendance', 'Pages.EntrepreneurAttendance', 'fa-duotone fa-calendar-days', '/app/main/master/entrepreneurAttendance'),
        //         new AppMenuItem('Editions', 'Pages.Editions', 'flaticon-app', '/app/admin/editions'),
        //         new AppMenuItem(
        //             'Administration',
        //             '',
        //             'fa-duotone fa-people-roof',
        //             '',
        //             [],
        //             [
        //                 new AppMenuItem(
        //                     'OrganizationUnits',
        //                     'Pages.Administration.OrganizationUnits',
        //                     'fa-duotone fa-poll-people',
        //                     '/app/admin/organization-units'
        //                 ),
        //                 new AppMenuItem('Roles', 'Pages.Administration.Roles', 'fa-duotone fa-person', '/app/admin/roles'),
        //                 new AppMenuItem('Users', 'Pages.Administration.Users', 'fa-duotone fa-users', '/app/admin/users'),
        //                 new AppMenuItem(
        //                     'Languages',
        //                     'Pages.Administration.Languages',
        //                     'fa-duotone fa-language',
        //                     '/app/admin/languages',
        //                     ['/app/admin/languages/{name}/texts']
        //                 ),
        //                 new AppMenuItem(
        //                     'AuditLogs',
        //                     'Pages.Administration.AuditLogs',
        //                     'fa-duotone fa-list-check',
        //                     '/app/admin/auditLogs'
        //                 ),
        //                 new AppMenuItem(
        //                     'Maintenance',
        //                     'Pages.Administration.Host.Maintenance',
        //                     'fa-duotone fa-sliders',
        //                     '/app/admin/maintenance'
        //                 ),
        //                 new AppMenuItem(
        //                     'Subscription',
        //                     'Pages.Administration.Tenant.SubscriptionManagement',
        //                     'fa-duotone fa-hand-pointer',
        //                     '/app/admin/subscription-management'
        //                 ),
        //                 new AppMenuItem(
        //                     'VisualSettings',
        //                     'Pages.Administration.UiCustomization',
        //                     'fa-duotone fa-eye',
        //                     '/app/admin/ui-customization'
        //                 ),
        //                 new AppMenuItem(
        //                     'WebhookSubscriptions',
        //                     'Pages.Administration.WebhookSubscription',
        //                     'fa-duotone fa-bell',
        //                     '/app/admin/webhook-subscriptions'
        //                 ),
        //                 new AppMenuItem(
        //                     'DynamicProperties',
        //                     'Pages.Administration.DynamicProperties',
        //                     'fa-duotone fa-star',
        //                     '/app/admin/dynamic-property'
        //                 ),
        //                 new AppMenuItem(
        //                     'Settings',
        //                     'Pages.Administration.Host.Settings',
        //                     'fa-duotone fa-gear',
        //                     '/app/admin/hostSettings'
        //                 ),
        //                 new AppMenuItem(
        //                     'Settings',
        //                     'Pages.Administration.Tenant.Settings',
        //                     'fa-duotone fa-gear',
        //                     '/app/admin/tenantSettings'
        //                 ),
        //                 new AppMenuItem(
        //                     'Notifications',
        //                     '',
        //                     'fa-duotone fa-bell',
        //                     '',
        //                     [],
        //                     [
        //                         new AppMenuItem(
        //                             'Inbox',
        //                             'fa-duotone fa-message',
        //                             'flaticon-mail-1',
        //                             '/app/notifications'
        //                         ),
        //                         new AppMenuItem(
        //                             'MassNotifications',
        //                             'Pages.Administration.MassNotification',
        //                             'fa-duotone fa-bells',
        //                             '/app/admin/mass-notifications'
        //                         )
        //                     ]
        //                 )
        //             ]
        //         ),
        //         new AppMenuItem(
        //             'DemoUiComponents',
        //             'Pages.DemoUiComponents',
        //             'fa-duotone fa-sliders',
        //             '/app/admin/demo-ui-components'
        //         ),
        //     ]);
        // }


    }

    checkChildMenuItemPermission(menuItem): boolean {
        for (let i = 0; i < menuItem.items.length; i++) {
            let subMenuItem = menuItem.items[i];

            if (subMenuItem.permissionName === '' || subMenuItem.permissionName === null) {
                if (subMenuItem.route) {
                    return true;
                }
            } else if (this._permissionCheckerService.isGranted(subMenuItem.permissionName)) {
                return true;
            }

            if (subMenuItem.items && subMenuItem.items.length) {
                let isAnyChildItemActive = this.checkChildMenuItemPermission(subMenuItem);
                if (isAnyChildItemActive) {
                    return true;
                }
            }
        }
        return false;
    }

    showMenuItem(menuItem: AppMenuItem): boolean {
        if (
            menuItem.permissionName === 'Pages.Administration.Tenant.SubscriptionManagement' &&
            this._appSessionService.tenant &&
            !this._appSessionService.tenant.edition
        ) {
            return false;
        }

        let hideMenuItem = false;

        if (menuItem.requiresAuthentication && !this._appSessionService.user) {
            hideMenuItem = true;
        }

        if (menuItem.permissionName && !this._permissionCheckerService.isGranted(menuItem.permissionName)) {
            hideMenuItem = true;
        }

        if (this._appSessionService.tenant || !abp.multiTenancy.ignoreFeatureCheckForHostUsers) {
            if (menuItem.hasFeatureDependency() && !menuItem.featureDependencySatisfied()) {
                hideMenuItem = true;
            }
        }

        if (!hideMenuItem && menuItem.items && menuItem.items.length) {
            return this.checkChildMenuItemPermission(menuItem);
        }

        return !hideMenuItem;
    }

    /**
     * Returns all menu items recursively
     */
    getAllMenuItems(): AppMenuItem[] {
        let menu = this.getMenu();
        let allMenuItems: AppMenuItem[] = [];
        menu.items.forEach((menuItem) => {
            allMenuItems = allMenuItems.concat(this.getAllMenuItemsRecursive(menuItem));
        });

        return allMenuItems;
    }

    private getAllMenuItemsRecursive(menuItem: AppMenuItem): AppMenuItem[] {
        if (!menuItem.items) {
            return [menuItem];
        }

        let menuItems = [menuItem];
        menuItem.items.forEach((subMenu) => {
            menuItems = menuItems.concat(this.getAllMenuItemsRecursive(subMenu));
        });

        return menuItems;
    }
}
