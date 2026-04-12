import smtplib
from email.mime.text import MIMEText

EMAIL = "studentstore142@gmail.com"
PASSWORD = "tfrh pnms kxpk fgys"


# ✅ HTML EMAIL FUNCTION
def send_email(to_email, subject, html_content):
    msg = MIMEText(html_content, "html")  # 🔥 IMPORTANT (HTML)
    msg["Subject"] = subject
    msg["From"] = EMAIL
    msg["To"] = to_email

    server = smtplib.SMTP_SSL("smtp.gmail.com", 465)
    server.login(EMAIL, PASSWORD)
    server.sendmail(EMAIL, to_email, msg.as_string())
    server.quit()


# 🔥 PROFESSIONAL OTP EMAIL
def send_otp_email(to_email, otp):
    subject = "🔐 Verify Your Email - Student Store"

    html = f"""
    <div style="font-family: Arial, sans-serif; background:#f4f6f8; padding:20px;">
      
      <div style="max-width:500px; margin:auto; background:white; padding:25px; border-radius:12px; text-align:center; box-shadow:0 10px 25px rgba(0,0,0,0.1);">
        
        <h1 style="color:#06b6d4; margin-bottom:10px;">🎓 Student Store</h1>
        
        <h2 style="color:#333;">Email Verification</h2>
        
        <p style="color:#555; font-size:14px;">
          Use the OTP below to verify your account:
        </p>

        <div style="font-size:32px; letter-spacing:12px; font-weight:bold; color:#1e1b4b; margin:25px 0;">
          {otp}
        </div>

        <p style="color:#777; font-size:13px;">
          This OTP will expire in <b>10 minutes</b>.
        </p>

        <hr style="margin:20px 0;" />

        <p style="color:#aaa; font-size:12px;">
          If you did not request this, please ignore this email.
        </p>

      </div>

    </div>
    """

    send_email(to_email, subject, html)