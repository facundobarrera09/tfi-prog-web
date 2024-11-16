import { AxiosError } from "axios";
import notify from "../notifications";

const handleAxiosError = <E extends AxiosError>(error: E) => {
    if (error.response) {
        // Handle 401, 403, 500
        switch (error.response.status) {
            case 401:
                console.log('Unauthorized')
                // send user to login
                break
            case 403:
                console.log('Forbidden')
                // inform lack of permissions to user
            case 404:
                console.log('Not found')
                notify.error("Ocurrió un error inesperado, contacte con el administrador")
                break
            case 500:
                notify.error("Error en el servidor, contacte al administrador")

        }
    } else if (error.request) {
        // Handle network error
        notify.error("No se pudo establecer conexión con el servidor")
    } else {
        notify.error("Ocurrió un error inesperado")
    }
}

export default handleAxiosError