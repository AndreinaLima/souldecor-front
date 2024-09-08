import { initializeApp } from "firebase/app"
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyDcETBX74hEEIrbIUVkRK8SSASCuodtDcU",
  authDomain: "e-commerce-casa-decoracao.firebaseapp.com",
  projectId: "e-commerce-casa-decoracao",
  storageBucket: "e-commerce-casa-decoracao.appspot.com",
  messagingSenderId: "303184179771",
  appId: "1:303184179771:web:a9f70b407ea8bac85ce21e",
}

export const app = initializeApp(firebaseConfig)
export const storage = getStorage(app)
