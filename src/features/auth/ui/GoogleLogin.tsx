// import {
//   GoogleSignin,
//   GoogleSigninButton,
//   statusCodes,
// } from "@react-native-google-signin/google-signin";

// import { supabase } from "@/shared/lib/supabase";

// export default function () {
//   GoogleSignin.configure({
//     webClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID as string,
//   });

//   return (
//     <GoogleSigninButton
//       size={GoogleSigninButton.Size.Wide}
//       color={GoogleSigninButton.Color.Dark}
//       onPress={async () => {
//         try {
//           await GoogleSignin.hasPlayServices();
//           const response = await GoogleSignin.signIn();
//           if (response.type === "success") {
//             const idToken = response.data.idToken;
//             if (!idToken) return;

//             const { data, error } = await supabase.auth.signInWithIdToken({
//               provider: "google",
//               token: idToken,
//             });
//             console.log(error, data);
//           }
//         } catch (error: any) {
//           if (error.code === statusCodes.IN_PROGRESS) {
//             // operation (e.g. sign in) is in progress already
//           } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
//             // play services not available or outdated
//           } else {
//             // some other error happened
//           }
//         }
//       }}
//     />
//   );
// }
