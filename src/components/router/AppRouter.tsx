import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// no lazy loading for auth pages to avoid flickering
const AuthLayout = React.lazy(() => import('@app/components/layouts/AuthLayout/AuthLayout'));
import LoginPage from '@app/pages/LoginPage';
import SignUpPage from '@app/pages/SignUpPage';
import ForgotPasswordPage from '@app/pages/ForgotPasswordPage';
import SecurityCodePage from '@app/pages/SecurityCodePage';
import NewPasswordPage from '@app/pages/NewPasswordPage';
import LockPage from '@app/pages/LockPage';
// import { FirstScreen } from '@app/NewPage/FirstScreen';
import MainLayout from '@app/components/layouts/main/MainLayout/MainLayout';
import ProfileLayout from '@app/components/profile/ProfileLayout';
import RequireAuth from '@app/components/router/RequireAuth';
import { withLoading } from '@app/hocs/withLoading.hoc';
import NftDashboardPage from '@app/pages/DashboardPages/NftDashboardPage';
import MedicalDashboardPage from '@app/pages/DashboardPages/MedicalDashboardPage';

const NewsFeedPage = React.lazy(() => import('@app/pages/NewsFeedPage'));
const KanbanPage = React.lazy(() => import('@app/pages/KanbanPage'));
const DataTablesPage = React.lazy(() => import('@app/pages/DataTablesPage'));
const ChartsPage = React.lazy(() => import('@app/pages/ChartsPage'));
const ServerErrorPage = React.lazy(() => import('@app/pages/ServerErrorPage'));
const Error404Page = React.lazy(() => import('@app/pages/Error404Page'));
const AdvancedFormsPage = React.lazy(() => import('@app/pages/AdvancedFormsPage'));
const PersonalInfoPage = React.lazy(() => import('@app/pages/PersonalInfoPage'));
const SecuritySettingsPage = React.lazy(() => import('@app/pages/SecuritySettingsPage'));
const NotificationsPage = React.lazy(() => import('@app/pages/NotificationsPage'));
const PaymentsPage = React.lazy(() => import('@app/pages/PaymentsPage'));
const ButtonsPage = React.lazy(() => import('@app/pages/uiComponentsPages/ButtonsPage'));
const SpinnersPage = React.lazy(() => import('@app/pages/uiComponentsPages/SpinnersPage'));
const AvatarsPage = React.lazy(() => import('@app/pages/uiComponentsPages/dataDisplay/AvatarsPage'));
const BadgesPage = React.lazy(() => import('@app/pages/uiComponentsPages/dataDisplay/BadgesPage'));
const CollapsePage = React.lazy(() => import('@app/pages/uiComponentsPages/dataDisplay/CollapsePage'));
const PaginationPage = React.lazy(() => import('@app/pages/uiComponentsPages/dataDisplay/PaginationPage'));
const ModalsPage = React.lazy(() => import('@app/pages/uiComponentsPages/modals/ModalsPage'));
const PopoversPage = React.lazy(() => import('@app/pages/uiComponentsPages/modals/PopoversPage'));
const PopconfirmsPage = React.lazy(() => import('@app/pages/uiComponentsPages/modals/PopconfirmsPage'));
const ProgressPage = React.lazy(() => import('@app/pages/uiComponentsPages/feedback/ProgressPage'));
const ResultsPage = React.lazy(() => import('@app/pages/uiComponentsPages/feedback/ResultsPage'));
const AlertsPage = React.lazy(() => import('@app/pages/uiComponentsPages/feedback/AlertsPage'));
const SkeletonsPage = React.lazy(() => import('@app/pages/uiComponentsPages/feedback/SkeletonsPage'));
const InputsPage = React.lazy(() => import('@app/pages/uiComponentsPages/forms/InputsPage'));
const CheckboxesPage = React.lazy(() => import('@app/pages/uiComponentsPages/forms/CheckboxesPage'));
const RadiosPage = React.lazy(() => import('@app/pages/uiComponentsPages/forms/RadiosPage'));
const SelectsPage = React.lazy(() => import('@app/pages/uiComponentsPages/forms/SelectsPage'));
const SwitchesPage = React.lazy(() => import('@app/pages/uiComponentsPages/forms/SwitchesPage'));
const UploadsPage = React.lazy(() => import('@app/pages/uiComponentsPages/forms/UploadsPage'));
const RatesPage = React.lazy(() => import('@app/pages/uiComponentsPages/forms/RatesPage'));
const AutoCompletesPage = React.lazy(() => import('@app/pages/uiComponentsPages/forms/AutoCompletesPage'));
const StepsPage = React.lazy(() => import('@app/pages/uiComponentsPages/forms/StepsPage'));
const DateTimePickersPage = React.lazy(() => import('@app/pages/uiComponentsPages/forms/DateTimePickersPage'));
const DropdownsPage = React.lazy(() => import('@app/pages/uiComponentsPages/DropdownsPage'));
const BreadcrumbsPage = React.lazy(() => import('@app/pages/uiComponentsPages/navigation/BreadcrumbsPage'));
const TabsPage = React.lazy(() => import('@app/pages/uiComponentsPages/navigation/TabsPage'));
const NotificationsUIPage = React.lazy(() => import('@app/pages/uiComponentsPages/feedback/NotificationsPage'));
const GoogleMaps = React.lazy(() => import('@app/pages/maps/GoogleMapsPage/GoogleMapsPage'));
const LeafletMaps = React.lazy(() => import('@app/pages/maps/LeafletMapsPage/LeafletMapsPage'));
const ReactSimpleMaps = React.lazy(() => import('@app/pages/maps/ReactSimpleMapsPage/ReactSimpleMapsPage'));
const PigeonsMaps = React.lazy(() => import('@app/pages/maps/PigeonsMapsPage/PigeonsMapsPage'));
const Logout = React.lazy(() => import('./Logout'));




const DefinePost = React.lazy(() => import('@app/NewPage/DefinePost'));
const DefineStates = React.lazy(() => import('@app/NewPage/DefineStates'));
const DefineProduct = React.lazy(() => import('@app/NewPage/DefineProduct'));
const DefineUserAccess = React.lazy(() => import('@app/NewPage/DefineUserAccess'));
const DefineSets = React.lazy(() => import('@app/NewPage/DefineSets'));
const DefineUsers = React.lazy(() => import('@app/NewPage/DefineUsers'));
const DefineUnit = React.lazy(() => import('@app/NewPage/DefineUnit'));
const DefineGroups = React.lazy(() => import('@app/NewPage/DefineGroups'));
const FiscalYears = React.lazy(() => import('@app/NewPage/FiscalYears'));
const DefineParts = React.lazy(() => import('@app/NewPage/DefineParts'));
const DefineSetsofProducts = React.lazy(() => import('@app/NewPage/DefineSetsofProducts'));
const DefineSetsofProductsReport = React.lazy(() => import('@app/NewPage/DefineSetsofProductsReport'));
const DefineGroupsofSets = React.lazy(() => import('@app/NewPage/DefineGroupsofSets'));

const FirstScreen = React.lazy(() => import('@app/NewPage/FirstScreen'));


const SetProduce = React.lazy(() => import('@app/NewPage/Order/SetProduce'));
const Kardex = React.lazy(() => import('@app/NewPage/Dashboard/Kardex'));
const KardexSets = React.lazy(() => import('@app/NewPage/Dashboard/KardexSets'));
const SetProduceList = React.lazy(() => import('@app/NewPage/Order/SetProduceList'));
const SetsetsGroupsList = React.lazy(() => import('@app/NewPage/Order/SetsetsGroupsList'));
const SetSetsGroups = React.lazy(() => import('@app/NewPage/Order/SetSetsGroups'));


const SetProduce2 = React.lazy(() => import('@app/NewPage/Order/SetProduce2'));
const Kardex2 = React.lazy(() => import('@app/NewPage/Dashboard/Kardex2'));
const KardexSets2 = React.lazy(() => import('@app/NewPage/Dashboard/KardexSets2'));
const SetProduceList2 = React.lazy(() => import('@app/NewPage/Order/SetProduceList2'));
const SetsetsGroupsList2 = React.lazy(() => import('@app/NewPage/Order/SetsetsGroupsList2'));
const SetSetsGroups2 = React.lazy(() => import('@app/NewPage/Order/SetSetsGroups2'));


const Charts = React.lazy(() => import('@app/NewPage/Dashboard/Charts'));

const HtmlEditor = React.lazy(() => import('@app/NewPage/HtmlEditor'));

const NewsList = React.lazy(() => import('@app/NewPage/Order/NewsList'));

const ShowNews = React.lazy(() => import('@app/NewPage/ShowNews'));
const Weblog = React.lazy(() => import('@app/NewPage/Weblog'));

const CSRReports = React.lazy(() => import('@app/NewPage/CSRReports'));
const DoctorReports = React.lazy(() => import('@app/NewPage/DoctorReports'));


// export const NFT_DASHBOARD_PATH = '/';
export const MEDICAL_DASHBOARD_PATH = '/';

const MedicalDashboard = withLoading(MedicalDashboardPage);
const NftDashboard = withLoading(NftDashboardPage);
const NewsFeed = withLoading(NewsFeedPage);
const Kanban = withLoading(KanbanPage);
const AdvancedForm = withLoading(AdvancedFormsPage);

// UI Components
const Buttons = withLoading(ButtonsPage);
const Spinners = withLoading(SpinnersPage);
const Inputs = withLoading(InputsPage);
const Checkboxes = withLoading(CheckboxesPage);
const Radios = withLoading(RadiosPage);
const Selects = withLoading(SelectsPage);
const Switches = withLoading(SwitchesPage);
const Uploads = withLoading(UploadsPage);
const Rates = withLoading(RatesPage);
const AutoCompletes = withLoading(AutoCompletesPage);
const Steps = withLoading(StepsPage);
const DateTimePickers = withLoading(DateTimePickersPage);
const Dropdowns = withLoading(DropdownsPage);
const Breadcrumbs = withLoading(BreadcrumbsPage);
const Tabs = withLoading(TabsPage);
const Avatars = withLoading(AvatarsPage);
const Badges = withLoading(BadgesPage);
const Collapse = withLoading(CollapsePage);
const Pagination = withLoading(PaginationPage);
const Modals = withLoading(ModalsPage);
const Popovers = withLoading(PopoversPage);
const Popconfirms = withLoading(PopconfirmsPage);
const Progress = withLoading(ProgressPage);
const Results = withLoading(ResultsPage);
const Alerts = withLoading(AlertsPage);
const NotificationsUI = withLoading(NotificationsUIPage);
const Skeletons = withLoading(SkeletonsPage);

const DataTables = withLoading(DataTablesPage);
const ChartsFallBack = withLoading(Charts);

const WeblogFallBack = withLoading(Weblog);

const CSRReportsFallBack = withLoading(CSRReports);

const DcotorReportsFallBack = withLoading(DoctorReports);

// Maps
const Google = withLoading(GoogleMaps);
const Leaflet = withLoading(LeafletMaps);
const ReactSimple = withLoading(ReactSimpleMaps);
const Pigeons = withLoading(PigeonsMaps);

const ServerError = withLoading(ServerErrorPage);
const Error404 = withLoading(Error404Page);

// Profile
const PersonalInfo = withLoading(PersonalInfoPage);
const SecuritySettings = withLoading(SecuritySettingsPage);
const Notifications = withLoading(NotificationsPage);
const Payments = withLoading(PaymentsPage);

const AuthLayoutFallback = withLoading(AuthLayout);
const LogoutFallback = withLoading(Logout);


const DefineStatesFallback = withLoading(DefineStates);
const DefinePostFallback = withLoading(DefinePost);
const DefineProductFallback = withLoading(DefineProduct);
const DefineUserAccessFallback = withLoading(DefineUserAccess)
const DefineUsersFallback = withLoading(DefineUsers)
const DefineSetsFallback = withLoading(DefineSets)
const FiscalYearsFallback = withLoading(FiscalYears)
const DefineGroupsFallback = withLoading(DefineGroups)
const DefinePartsFallback = withLoading(DefineParts)
const DefineUnitFallback = withLoading(DefineUnit)
const DefineGroupsofSetsFallback = withLoading(DefineGroupsofSets)
const DefineSetsofProductsFallback = withLoading(DefineSetsofProducts)

const DefineSetsofProductsReportFallback = withLoading(DefineSetsofProductsReport)
const SetProduceFallback = withLoading(SetProduce)
const SetSetsGroupsFallback = withLoading(SetSetsGroups)
const FirstScreenFallback = withLoading(FirstScreen)
const SetProduceListFallback = withLoading(SetProduceList)
const SetsetsGroupsListFallback = withLoading(SetsetsGroupsList)
const KardexFallback = withLoading(Kardex)
const KardexSetsFallback = withLoading(KardexSets)



const SetProduceFallback2 = withLoading(SetProduce2)
const SetSetsGroupsFallback2 = withLoading(SetSetsGroups2)
const SetProduceListFallback2 = withLoading(SetProduceList2)
const SetsetsGroupsListFallback2 = withLoading(SetsetsGroupsList2)
const KardexFallback2 = withLoading(Kardex2)
const KardexSetsFallback2 = withLoading(KardexSets2)
const HtmlEditorFallback = withLoading(HtmlEditor)
const NewsListFallback = withLoading(NewsList)
const ShowNewsFallback = withLoading(ShowNews)
export const AppRouter: React.FC = () => {
  const protectedLayout = (
    <RequireAuth>
      <MainLayout />
    </RequireAuth>
  );

  return (
    <BrowserRouter>
      <Routes>
        <Route path={MEDICAL_DASHBOARD_PATH} element={protectedLayout}>
          {/* <Route index element={<NftDashboard />} /> */}
          <Route path={MEDICAL_DASHBOARD_PATH} element={<FirstScreenFallback />} />
          <Route path="apps">
            {/* <Route path="feed" element={<NewsFeed />} />
            <Route path="kanban" element={<Kanban />} /> */}
          </Route>
          <Route path="forms">
            {/* <Route path="advanced-forms" element={<AdvancedForm />} /> */}
          </Route>
          <Route path="data-tables" element={<DataTables />} />

          

          <Route path="DefineUsers" element={<DefineUsersFallback />} />

          <Route path="Kardex" element={<KardexFallback />} />

          <Route path="CSRReports" element={<CSRReportsFallBack />} />
          <Route path="DoctorReports" element={<DcotorReportsFallBack />} />

          <Route path="KardexSets" element={<KardexSetsFallback />} />

          <Route path="Kardex2" element={<KardexFallback2 />} />
          <Route path="KardexSets2" element={<KardexSetsFallback2 />} />


          <Route path="HtmlEditor" element={<HtmlEditorFallback />} />
          
          <Route path="NewsList" element={<NewsListFallback />} />

          <Route path="Weblog" element={<WeblogFallBack />} />
          <Route path="ShowNews" element={<ShowNewsFallback />} />


          <Route path="SetProduceList" element={<SetProduceListFallback />} />
          <Route path="SetsetsGroupsList" element={<SetsetsGroupsListFallback />} />

          <Route path="SetProduceList2" element={<SetProduceListFallback2 />} />
          <Route path="SetsetsGroupsList2" element={<SetsetsGroupsListFallback2 />} />

          <Route path="DefineStates" element={<DefineStatesFallback />} />
          <Route path="DefinePost" element={<DefinePostFallback />} />
          <Route path="DefineProduct" element={<DefineProductFallback/>} />
          <Route path="DefineUserAccess" element={<DefineUserAccessFallback/>} />
          <Route path="DefineSets" element={<DefineSetsFallback />} />
          <Route path="DefineUnit" element={<DefineUnitFallback />} />
          <Route path="FiscalYears" element={<FiscalYearsFallback />} />
          <Route path="DefineGroups" element={<DefineGroupsFallback />} />
          <Route path="DefineParts" element={<DefinePartsFallback />} />
          <Route path="DefineGroupsofSets" element={<DefineGroupsofSetsFallback />} />
          <Route path="DefineSetsofProducts" element={<DefineSetsofProductsFallback />} />

          <Route path="DefineSetsofProductsReport" element={<DefineSetsofProductsReportFallback />} />

          <Route path="SetProduce" element={<SetProduceFallback />} />
          <Route path="SetProduce2" element={<SetProduceFallback2 />} />

          <Route path="SetSetsGroups" element={<SetSetsGroupsFallback />} />
          <Route path="SetSetsGroups2" element={<SetSetsGroupsFallback2 />} />

          
          <Route path="Charts" element={<ChartsFallBack />} />
          <Route path="maps">
            <Route path="google-maps" element={<Google />} />
            <Route path="leaflet-maps" element={<Leaflet />} />
            <Route path="react-simple-maps" element={<ReactSimple />} />
            <Route path="pigeon-maps" element={<Pigeons />} />
          </Route>
          <Route path="server-error" element={<ServerError />} />
          <Route path="404" element={<Error404 />} />
          <Route path="profile" element={<ProfileLayout />}>
            <Route path="personal-info" element={<PersonalInfo />} />
            <Route path="security-settings" element={<SecuritySettings />} />
            <Route path="notifications" element={<Notifications />} />
            <Route path="payments" element={<Payments />} />
          </Route>
          {/* <Route path="ui-components">
            <Route path="button" element={<Buttons />} />
            <Route path="spinner" element={<Spinners />} />
            <Route path="input" element={<Inputs />} />
            <Route path="checkbox" element={<Checkboxes />} />
            <Route path="radio" element={<Radios />} />
            <Route path="select" element={<Selects />} />
            <Route path="switch" element={<Switches />} />
            <Route path="upload" element={<Uploads />} />
            <Route path="rate" element={<Rates />} />
            <Route path="auto-complete" element={<AutoCompletes />} />
            <Route path="steps" element={<Steps />} />
            <Route path="date-time-picker" element={<DateTimePickers />} />
            <Route path="dropdown" element={<Dropdowns />} />
            <Route path="breadcrumbs" element={<Breadcrumbs />} />
            <Route path="tabs" element={<Tabs />} />
            <Route path="avatar" element={<Avatars />} />
            <Route path="badge" element={<Badges />} />
            <Route path="collapse" element={<Collapse />} />
            <Route path="pagination" element={<Pagination />} />
            <Route path="modal" element={<Modals />} />
            <Route path="popover" element={<Popovers />} />
            <Route path="popconfirm" element={<Popconfirms />} />
            <Route path="progress" element={<Progress />} />
            <Route path="result" element={<Results />} />
            <Route path="alert" element={<Alerts />} />
            <Route path="notification" element={<NotificationsUI />} />
            <Route path="skeleton" element={<Skeletons />} />
          </Route> */}
        </Route>
        <Route path="FirstScreen" element={<FirstScreenFallback />} />
        <Route path="/auth" element={<AuthLayoutFallback />}>
          <Route path="login" element={<LoginPage />} />
          <Route path="sign-up" element={<SignUpPage />} />
          <Route
            path="lock"
            element={
              <RequireAuth>
                <LockPage />
              </RequireAuth>
            }
          />
          <Route path="forgot-password" element={<ForgotPasswordPage />} />
          <Route path="security-code" element={<SecurityCodePage />} />
          <Route path="new-password" element={<NewPasswordPage />} />
        </Route>
        <Route path="/logout" element={<LogoutFallback />} />
      </Routes>
    </BrowserRouter>
  );
};
