// import {queryOption} from '@tanstack/react-query'

// /**
//  * keys in react query
//  */
// const keys = {
//     root: () => ["session"],
//     signin: () => [...keys.root()],
//     logout: () => [...keys.root()],
//     listByFilter: (filter: unknown) => [...keys.root(), filter],
// }

// const signinService = {
//     queryKey: () => keys.signin(),
//     queryOption: () => queryOption({
//         queryKey: signinService.queryKey()
//         queryFn: () => signin(),
//         select: (data) => data.data.success,
//     })
// }

// // not entities , allowed -> feature, widgets, pages, app
// const { data } = useQuery(sessionService.queryOption())

// function useLogoutMutation() {
//     const token = useToken();
//     return useMutation({
//         mutationKey: keys.logout(),
//         mutationfn: () => logout(token),
//     })
// }

// function LogoutButton() {
//     const { mutate } = sessionQuries.useLogoutMutation();
//     return <button type="button" onClick={mutate}>Logout</button>
// }
