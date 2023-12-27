export default function myPaginate(data: any[], options = {}, paginate: (data: any[], options: any) => any[]) {
    const paths = paginate(data, options);
    for (let path of paths) {
        path.params.page = "page/" + path.params.page;
    }
    paths[0].params.page = undefined;
    return paths;
}
