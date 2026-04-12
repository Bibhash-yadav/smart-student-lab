import os
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail
from dotenv import load_dotenv

load_dotenv()

SENDGRID_API_KEY = os.getenv("SENDGRID_API_KEY")

# ⚠️ Must be verified in SendGrid
FROM_EMAIL = "studentstore142@gmail.com"


# ✅ MAIN EMAIL FUNCTION
def send_email(to_email, subject, text_content, html_content):
    try:
        message = Mail(
            from_email=FROM_EMAIL,
            to_emails=to_email,
            subject=subject,
            plain_text_content=text_content,
            html_content=html_content
        )

        sg = SendGridAPIClient(SENDGRID_API_KEY)
        response = sg.send(message)

        print("Email sent ✅ Status:", response.status_code)

    except Exception as e:
        print("Email sending failed ❌:", str(e))


# 🔥 OTP EMAIL (DESIGN UPDATED)
def send_otp_email(to_email, otp):
    subject = "Your OTP Code - Student Store"

    # ✅ Plain text (IMPORTANT)
    text_content = f"""
Student Store Verification

Your OTP code is: {otp}

This code will expire in 10 minutes.

If you did not request this, ignore this email.
"""

    # ✅ PROFESSIONAL HTML DESIGN
    html_content = f"""
<div style="background:#f4f6f8; padding:20px; font-family:Arial, sans-serif;">
  
  <table align="center" width="100%" cellpadding="0" cellspacing="0"
         style="max-width:500px; background:#ffffff; border-radius:10px; overflow:hidden;">

    <!-- Header -->
    <tr>
      <td style="background:#0f172a; color:#ffffff; padding:20px; text-align:center;">
        <h2 style="margin:0;">Student Store</h2>
      </td>
    </tr>

    <!-- Body -->
    <tr>
      <td style="padding:25px; text-align:center; color:#333;">
        
        <h3 style="margin-bottom:10px;">Verify Your Email</h3>

        <p style="font-size:14px; color:#555;">
          Use the code below to continue:
        </p>

        <!-- OTP BOX -->
        <div style="
          display:inline-block;
          margin:20px 0;
          padding:14px 24px;
          font-size:28px;
          font-weight:bold;
          letter-spacing:8px;
          background:#e0f2fe;
          color:#0f172a;
          border-radius:8px;
        ">
          {otp}
        </div>

        <p style="font-size:13px; color:#777;">
          This code expires in <b>10 minutes</b>.
        </p>

      </td>
    </tr>

    <!-- Footer -->
    <tr>
      <td style="padding:15px; text-align:center; font-size:12px; color:#999;">
        If you didn’t request this, you can safely ignore this email.
      </td>
    </tr>

  </table>

</div>
"""

    send_email(to_email, subject, text_content, html_content)