# Registro de Horas de Trabajo

## Introducción
Este proyecto tiene como objetivo crear una aplicación para el registro de horas de trabajo. La aplicación consta de varias pantallas y funcionalidades que permiten a los usuarios registrar su hora de entrada, hora de salida, consultar registros y gestionar novedades. El repositorio del proyecto está organizado en dos carpetas principales:

1. **Login**: En esta carpeta se encuentra el código relacionado con las pantallas de inicio de sesión y registro.
2. **Dashboard**: En esta carpeta se encuentra todo lo relacionado con el Menú Principal de la aplicación.


## Pantalla de Bienvenida
La pantalla de bienvenida es la primera pantalla que los usuarios verán al iniciar la aplicación. En esta pantalla, se presenta una breve introducción a la aplicación y se ofrecen dos opciones: "Registrarse" e "Iniciar Sesión".

<img src="https://github.com/luismiguelro/ConstruccionLuisMiguel/assets/101124184/602d1204-1c06-4822-8f1c-4d36ee26bf7f" alt="welcome" width="200">

- **Registrarse**: Al seleccionar esta opción, los usuarios son redirigidos a la pantalla de registro donde pueden completar un formulario que incluye campos como nombre, correo electrónico y contraseña. La validación de campos en blanco se realiza automáticamente. Una vez completado el registro, se redirige al usuario al Menú Principal.
<img src="https://github.com/luismiguelro/ConstruccionLuisMiguel/assets/101124184/c18b8404-279a-4a58-820d-6b03418912ea" alt="crear cuenta" width="200">

- **Iniciar Sesión**: Al seleccionar esta opción, los usuarios son llevados a la pantalla de inicio de sesión. Aquí, deben ingresar su correo electrónico y contraseña. Si la información es válida, se les permite el acceso. En caso contrario, se muestra una notificación de "Correo o contraseña incorrecta".
<img src="https://github.com/luismiguelro/ConstruccionLuisMiguel/assets/101124184/3e24ec56-9200-4997-9e9b-cdead179ef18" alt="iniciar-sesion" width="200">

## Menú Principal
El Menú Principal es la pantalla central de la aplicación y ofrece cuatro tarjetas diferentes:

<img src="https://github.com/luismiguelro/ConstruccionLuisMiguel/assets/101124184/2b903db1-2937-4435-ad87-f7b764c2a416" alt="dashboard" width="200">

### 1. Registrar Hora de Entrada
En esta tarjeta, los usuarios pueden registrar la hora de entrada. Al presionar el botón correspondiente, se captura la hora y la fecha actual, se almacena en la memoria local y se muestra en la misma tarjeta. Si se intenta registrar nuevamente, aparece una alerta indicando que ya se realizó un registro previo.

### 2. Registrar Hora de Salida
Similar a la tarjeta de registro de hora de entrada, esta tarjeta permite a los usuarios registrar la hora de salida. Una vez registrada, se muestra la información en la tarjeta y se impide el registro adicional con una alerta de "Registro ya realizado".

<img src="https://github.com/luismiguelro/ConstruccionLuisMiguel/assets/101124184/dd416f2b-20bc-4dac-ba8b-3463e2a63190" alt="dashboard-hora" width="200">

### 3. Consultas
En esta tarjeta, los usuarios pueden realizar consultas de sus registros de entrada y salida. Se proporcionan dos campos de entrada para especificar una "Fecha de Inicio" y una "Fecha de Fin". Si las fechas son correctas y existen registros dentro del rango especificado, se muestran los detalles de los registros y las horas trabajadas para cada día. Si no hay registros en el rango, se muestra una alerta.(aca hago pie de que al momento de desarollar no hice busqueda de algun componente externo, si no que valide con el formato dd/mm/yyyy)

<img src="https://github.com/luismiguelro/ConstruccionLuisMiguel/assets/101124184/735bad6a-102d-498f-8854-f151211da09d" alt="consultas" width="200">

### 4. Novedades
En la tarjeta de Novedades, los usuarios pueden gestionar eventos especiales, como incapacidades, vacaciones y licencias. La pantalla incluye dos campos de fecha para ingresar "Fecha de Inicio" y "Fecha de Fin". Se valida el formato de fecha y se notifica cualquier error.

#### Opciones de Novedades
- **Incapacidades**: Permite ingresar fechas de inicio y fin para las incapacidades.
- **Vacaciones**: Requiere especificar un período de vacaciones, con un mínimo de 1 día y un máximo de 15 días.
- **Licencias**: Las licencias no pueden exceder 8 horas en un solo día; se ingresan en formato "hh:mm" en un campo de entrada normal.

#### Funciones Adicionales
- **Calcular Días**: Al presionar este botón, se muestra una alerta con el cálculo de días según la opción de novedad seleccionada. Se realizan validaciones específicas para cada tipo de novedad.
- **Guardar**: Permite guardar la novedad en la memoria local.
  
<img src="https://github.com/luismiguelro/ConstruccionLuisMiguel/assets/101124184/b09a440d-9f86-4193-a3bd-f3e67e0b28a6" alt="novedades-btns" width="200">

## Pantalla Principal - Cierre de Sesión
En la pantalla principal, se incluye un icono de "Salir". Al hacer clic en este icono, los usuarios son redirigidos a la pantalla de inicio de sesión ubicada en la carpeta "Login". Si no se presiona este icono y se inicia la aplicación nuevamente, se carga automáticamente la pantalla principal ubicada en la carpeta "Dashboard".

<img src="https://github.com/luismiguelro/ConstruccionLuisMiguel/assets/101124184/f06c81d7-dda9-46c0-85ff-f9f71f631ba9" alt="cierre-sesion" width="200">




