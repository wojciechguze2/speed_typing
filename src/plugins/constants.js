export const TITLE = 'Typing speed test'
export const REGISTER_ENABLED = true
export const PASSWORD_REMINDER_ENABLED = false
export const REGISTER_NEED_ADMIN_ACCEPT = false
export const ACCOUNT_EMAIL_CHANGE_AVAILABLE = false
export const FOOTER_MAX_GAME_MODES = 5
export const DEFAULT_PAGINATION_LIMIT = 10
export const MOBILE_MAX_WIDTH_PX = 767

// default routes
export const LOGIN_SUCCESS_REDIRECT_URL = '/'
export const REGISTER_SUCCESS_REDIRECT_URL = '/login'
export const DEFAULT_AUTHENTICATED_REDIRECT_URL = '/'
export const LANGUAGE_CHANGE_REDIRECT_URL = '/'
export const DEFAULT_NOT_AUTHENTICATED_REDIRECT_URL = '/login'
export const LOGOUT_URL = '/logout'

// locales / languages
export const DEFAULT_LOCALE_ISO = 'pl'
export const AVAILABLE_LOCALES = [
    'pl',
    'en',
    'de'
]

// game
export const GAME_MODE_FAST = 'fast-game'
export const GAME_MODE_RANDOM = 'random'
export const EXPECTED_OUTPUT_TYPE_TEXT = 'text'
export const EXPECTED_OUTPUT_TYPE_WORD = 'word'
export const EXPECTED_OUTPUT_TYPE_LETTER = 'letter'
export const BY_ONE_WORD_GAME_MODES = [
    'by-one-word'
]
export const BY_ONE_LETTER_GAME_MODES = [
    'by-one-letter'
]
export const GAME_MODE_TYPE_TIME = 'time'

// alerts
export const ALERT_TYPE_INFO = 'info'
export const ALERT_TYPE_SUCCESS = 'success'
export const ALERT_TYPE_WARNING = 'warning'
export const ALERT_TYPE_DANGER = 'danger'
export const ALERT_TYPES = [
    ALERT_TYPE_INFO,
    ALERT_TYPE_SUCCESS,
    ALERT_TYPE_WARNING,
    ALERT_TYPE_DANGER
]

// links
export const LINKEDIN_LINK = 'https://www.linkedin.com/in/wojciech-guze/'
export const GITHUB_LINK = 'https://github.com/wojciechguze2'
export const MAIL_LINK = 'mailto:wojciechguze2@gmail.com'
export const PHONE_LINK = 'tel:+48518118593'

// times (ms)
export const HOMEPAGE_SPECIAL_TYPING_INTERVAL = 100
export const HOMEPAGE_SPECIAL_TYPING_COUNTDOWN = 500
export const HOMEPAGE_SPECIAL_ANIMATION_REFRESH_TIMEOUT = 2500
export const FOOTER_ANIMATION_TIMEOUT = 4000
export const ALERT_TIMEOUT = 5000

// translation codes
export const ALERT_GAME_LOSS_TITLE_CODE = 'alert.game_loss.title'
export const ALERT_GAME_LOSS_MESSAGE_CODE = 'alert.game_loss.code'
export const ALERT_LOAD_DATA_ERROR_TITLE_CODE = 'alert.load_data_error.title'
export const ALERT_LOAD_DATA_ERROR_MESSAGE_CODE = 'alert.load_data_error.message'
export const ALERT_SAVE_GAME_SUCCESS_TITLE_CODE = 'alert.save_game_success.title'
export const ALERT_SAVE_GAME_SUCCESS_MESSAGE_CODE = 'alert.save_game_success.message'
export const ALERT_SAVE_GAME_USER_NOT_LOGGED_ERROR_TITLE_CODE = 'alert.save_game.not_authenticated.title'
export const ALERT_SAVE_GAME_USER_NOT_LOGGED_ERROR_MESSAGE_CODE = 'alert.save_game.not_authenticated.message'
export const ALERT_EMAIL_VALIDATION_ERROR_MESSAGE_CODE = 'alert.email_validation_error.title'
export const ALERT_DEFAULT_SUCCESS_MESSAGE_CODE = 'alert.success.message'
export const ALERT_DEFAULT_ERROR_MESSAGE_CODE = 'alert.error.message'
export const EMAIL_NOT_VALID_MESSAGE = 'messages.email_validation_error'
export const LOGIN_ERROR_MESSAGE = 'messages.login_error'
export const USER_IS_NOT_ACTIVE_MESSAGE = 'messages.user_inactive'
export const REGISTER_ERROR_MESSAGE = 'register.error_message'
export const USER_ALREADY_EXISTS_MESSAGE = 'messages.user_already_exists'
