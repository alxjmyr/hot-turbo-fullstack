import smtplib
from email.message import EmailMessage

from app.core.config import (
    EMAIL_ENABLED,
    EMAIL_PASSWORD,
    EMAIL_USER,
    SMTP_PORT,
    SMTP_URL,
    DOMAIN_FRONTEND,
    app_logger,
)


def send_email(html: str, send_to: str) -> bool:
    """
    Purpose:
    """
    if not EMAIL_ENABLED:
        app_logger.info("Unable to send email not enabled ")
        return False

    message = EmailMessage()
    message["To"] = send_to
    message["From"] = EMAIL_USER
    message["Subject"] = "Hot Turbo Password Recovery"

    message.add_alternative(html, subtype="html")

    smtp_server = smtplib.SMTP_SSL(SMTP_URL, SMTP_PORT)
    smtp_server.login(EMAIL_USER, EMAIL_PASSWORD)

    try:
        send_message = smtp_server.send_message(message)
    except Exception as e:
        app_logger.error(e)
        raise e
    finally:
        smtp_server.quit()

    if send_message == {}:
        return True
    else:
        False


def send_password_reset(token: str, email: str) -> bool:
    with open("app/email_templates/password_reset.html", "r") as f:
        template = f.read()

    send_reset = send_email(
        html=template.replace("{{link}}", f"{DOMAIN_FRONTEND}/password-reset/{token}"),
        send_to=email,
    )

    return send_reset
