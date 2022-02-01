export const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/mobile/Index.vue') },

      // Авторизация и регистрация
      { path: 'auth', component: () => import('pages/mobile/Auth/Auth.vue') },
      { path: 'auth/forgot-password', component: () => import('src/pages/mobile/Auth/RecoveryPassword/Forgot.vue') },
      { path: 'auth/sent-password', component: () => import('src/pages/mobile/Auth/RecoveryPassword/Sent.vue') },
      { path: 'auth/register', component: () => import('pages/mobile/Auth/Register/Register.vue') },
      { path: 'auth/register/register-completed', component: () => import('pages/mobile/Auth/Register/RegisterCompleted.vue') }, // нужно воткнуть перед "Работа с приложением"
      { path: 'auth/register/upload-completed', component: () => import('pages/mobile/Auth/Register/UploadCompleted.vue') },

      // Мерчант
      { path: 'home/merchant', component: () => import('pages/mobile/Merchant/Home.vue') },
      {
        path: 'home/merchant/me',
        name: 'merchant-info',
        component: () => import('src/pages/mobile/Merchant/Cabinet/Cabinet.vue')
      },
      { path: 'home/merchant/training-testing', component: () => import('src/pages/mobile/Merchant/TrainingAndTesting/TrainingAndTesting.vue') },
      { path: 'home/merchant/training-testing/materials', component: () => import('pages/mobile/Merchant/TrainingAndTesting/Tutorial/Materials.vue'), props: true, name: 'materials' },
      { path: 'home/merchant/training-testing/testing', component: () => import('pages/mobile/Merchant/TrainingAndTesting/Tutorial/Testing.vue'), props: true, name: 'testing' },
      { path: 'home/merchant/training-testing/video-materials', component: () => import('pages/mobile/Merchant/TrainingAndTesting/VideoMaterials.vue') },
      { path: 'home/merchant/information', component: () => import('pages/mobile/Merchant/Information/Information.vue') },
      { path: 'home/merchant/information/paysheet', component: () => import('pages/mobile/Merchant/Information/Paysheet.vue'), props: true, name: 'paysheetinfo' },
      { path: 'home/merchant/information/bonuses', component: () => import('pages/mobile/Merchant/Information/Bonuses.vue') },
      { path: 'home/merchant/information/certificates', component: () => import('pages/mobile/Merchant/Information/Certificates.vue') },
      { path: 'home/merchant/information/vacation', component: () => import('pages/mobile/Merchant/Information/Vacation/Vacation.vue') },
      { path: 'home/merchant/information/vacation/payments', component: () => import('pages/mobile/Merchant/Information/Vacation/VacationPayments.vue') },
      { path: 'home/merchant/information/vacation/annual', component: () => import('pages/mobile/Merchant/Information/Vacation/AnnualVacation.vue') },
      { path: 'home/merchant/information/sick-leave', component: () => import('pages/mobile/Merchant/Information/SickLeave.vue') },

      { path: 'home/merchant/territory', component: () => import('pages/mobile/Super/Territory/Territory.vue') },
      { path: 'home/merchant/territory/replacement', component: () => import('pages/mobile/Super/Territory/Replacement.vue') },
      { path: 'home/merchant/territory/probation', component: () => import('pages/mobile/Super/Territory/Probation.vue') },
      { path: 'home/merchant/territory/vacation-schedule', component: () => import('pages/mobile/Super/Territory/VacationSchedule/VacationSchedule.vue') },
      { path: 'home/merchant/territory/vacation-schedule/download', component: () => import('pages/mobile/Super/Territory/VacationSchedule/Download.vue') },
      { path: 'home/merchant/territory/vacation-schedule/edit', component: () => import('pages/mobile/Super/Territory/VacationSchedule/Edit.vue') },
      { path: 'home/merchant/territory/tutorial', component: () => import('pages/mobile/Super/Territory/Tutorial/Tutorial.vue'), props: true },

      // Супер
      { path: 'home/super', component: () => import('pages/mobile/Super/Home.vue') },
      {
        path: 'home/super/me',
        name: 'super-info',
        component: () => import('src/pages/mobile/Super/Cabinet.vue')
      },
      { path: 'home/super/territory', component: () => import('pages/mobile/Super/Territory/Territory.vue') },
      { path: 'home/super/territory/replacement', component: () => import('pages/mobile/Super/Territory/Replacement.vue') },
      { path: 'home/super/territory/probation', component: () => import('pages/mobile/Super/Territory/Probation.vue') },
      { path: 'home/super/territory/vacation-schedule', component: () => import('pages/mobile/Super/Territory/VacationSchedule/VacationSchedule.vue') },
      { path: 'home/super/territory/vacation-schedule/download', component: () => import('pages/mobile/Super/Territory/VacationSchedule/Download.vue') },
      { path: 'home/super/territory/vacation-schedule/edit', component: () => import('pages/mobile/Super/Territory/VacationSchedule/Edit.vue') },
      { path: 'home/super/territory/tutorial', component: () => import('pages/mobile/Super/Territory/Tutorial/Tutorial.vue') },
      // { path: 'home/super/message/:id', name: 'message', component: () => import('pages/mobile/Super/Message.vue') },
      // { path: 'home/super/information', component: () => import('pages/mobile/Super/Information/Information.vue') },
      // { path: 'home/super/information/paysheet', component: () => import('pages/mobile/Super/Information/Paysheet.vue'), props: true, name: 'paysheetinfo' },
      // { path: 'home/super/information/bonuses', component: () => import('pages/mobile/Super/Information/Bonuses.vue') },
      // { path: 'home/super/information/certificates', component: () => import('pages/mobile/Super/Information/Certificates.vue') },
      // { path: 'home/super/information/vacation', component: () => import('pages/mobile/Super/Information/Vacation/Vacation.vue') },
      // { path: 'home/super/information/vacation/payments', component: () => import('pages/mobile/Super/Information/Vacation/VacationPayments.vue') },
      // { path: 'home/super/information/vacation/annual', component: () => import('pages/mobile/Super/Information/Vacation/AnnualVacation.vue') },
      // { path: 'home/super/information/sick-leave', component: () => import('pages/mobile/Super/Information/SickLeave.vue') },

      // Общие макеты
      { path: 'fired', component: () => import('src/pages/mobile/General/Fired.vue') },
      { path: 'home/message/:id', name: 'message', component: () => import('src/pages/mobile/General/Message.vue') },

      // Админ
      { path: 'home/admin', component: () => import('pages/mobile/Admin/Home.vue') },
      {
        path: 'home/admin/me',
        name: 'admin-info',
        component: () => import('src/pages/mobile/Admin/Cabinet/Cabinet.vue')
      },
      { path: 'home/admin/documents/employment', component: () => import('pages/mobile/Admin/Employment/EmploymentDocuments.vue') },
      {
        path: 'home/admin/documents/employment/:uuid',
        name: 'employment',
        component: () => import('src/pages/mobile/Admin/Employment/EmployeeDocumentsForEmployment.vue')
      },
      { path: 'home/admin/documents/vacation', component: () => import('pages/mobile/Admin/Vacation/VacationDocuments.vue') },
      // {
      //   path: 'home/admin/documents/vacation/:id',
      //   name: 'vacation',
      //   component: () => import('pages/mobile/Admin/Vacation/EmployeeDocumentsForVacation.vue')
      // },
      {
        path: 'home/admin/documents/vacation/:uuid',
        name: 'vacation',
        component: () => import('src/pages/mobile/Admin/Vacation/EmployeeDocumentsForVacation.vue')
      },
      { path: 'home/admin/send-message', component: () => import('pages/mobile/Admin/SendMessage.vue') },
      { path: 'home/admin/monthly-messages', component: () => import('src/pages/mobile/Admin/MonthlyMessages/MonthlyMessages.vue') },
      { path: 'home/admin/edit-paysheet', component: () => import('pages/mobile/Admin/EditPaysheet.vue') },
      { path: 'home/admin/tutorial', component: () => import('pages/mobile/Admin/Tutorial/Tutorial.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/mobile/Error404.vue')
  }
]
