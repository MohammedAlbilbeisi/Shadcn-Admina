import { Layout } from "@/components/custom/layout";
import { Search } from "@/components/search";
import ThemeSwitch from "@/components/theme-switch";
import { UserNav } from "@/components/user-nav";
import { columns } from "./components/columns";
import { tasks } from "./data/tasks";
import { DataTable } from "@/components/ui/table/data-table";
import { Row } from "@tanstack/react-table";
import { DataTableToolbar } from "./components/data-table-toolbar";
import { useGetTasks } from "@/query-hooks/tasks/use-get-tasks";
import { useTask } from "./hooks/use-tasks";

export default function Tasks() {
  // const { data: tasks, isLoading } = useGetTasks(); // fetch data using this
  const { tasksList } = useTask();
  const renderSubComponent = ({ row }: { row: Row<any> }) => {
    return (
      <pre style={{ fontSize: "10px" }}>
        <code>{JSON.stringify(row.original, null, 2)}</code>
      </pre>
    );
  };

  return (
    <Layout>
      {/* ===== Top Heading ===== */}
      <Layout.Header sticky>
        <Search />
        <div className="ml-auto flex items-center space-x-4">
          <ThemeSwitch />
          <UserNav />
        </div>
      </Layout.Header>

      <Layout.Body>
        <div className="mb-2 flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
            <p className="text-muted-foreground">
              Here&apos;s a list of your tasks for this month!
            </p>
          </div>
        </div>
        <div className="-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0">
          <DataTable
            data={tasksList}
            columns={columns}
            getRowCanExpand={() => true}
            renderSubComponent={renderSubComponent}
            ToolbarComponent={DataTableToolbar}
          />
        </div>
      </Layout.Body>
    </Layout>
  );
}
