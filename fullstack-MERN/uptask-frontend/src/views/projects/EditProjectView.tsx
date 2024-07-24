import { Navigate, useActionData, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProjectById } from "../../api/ProjectAPI";
import EditProjectForm from "../../components/projects/EditProjectForm";

export default function EditProjectView() {
  const params = useParams();
  const projectId = params.projectId!;
  console.log(projectId);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["editProject", projectId],
    queryFn: () => getProjectById(projectId),
    retry: false,
  });

  if (isLoading) return <p>Cargando...</p>;
  if (isError) return <Navigate to="/404" />;
  //   console.log(data, isLoading, error, isError);
  if (data) return <EditProjectForm data={data }projectId={projectId}/>
}
